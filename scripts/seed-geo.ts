import { db } from "@/lib/db";

interface ApiDepartment {
  id: number;
  name: string;
}

interface ApiCity {
  id: number;
  name: string;
  departmentId: number;
}

async function fetchDepartments(): Promise<ApiDepartment[]> {
  const response = await fetch('https://api-colombia.com/api/v1/Department');
  if (!response.ok) {
    throw new Error('Failed to fetch departments');
  }
  return response.json();
}

async function fetchCities(): Promise<ApiCity[]> {
  const response = await fetch('https://api-colombia.com/api/v1/City');
  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }
  return response.json();
}

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await db.city.deleteMany();
  await db.province.deleteMany();

  // First, fetch and create all departments (provinces)
  const departments = await fetchDepartments();
  console.log(`Creating ${departments.length} provinces...`);

  const departmentMap = new Map<number, string>(); // Map to store API ID -> Database ID

  for (const dept of departments) {
    const province = await db.province.create({
      data: {
        name: dept.name,
      },
    });
    departmentMap.set(dept.id, province.id);
    console.log(`Created province: ${dept.name}`);
  }

  // Then fetch and create all cities with their proper relationships
  const cities = await fetchCities();
  console.log(`Creating ${cities.length} cities...`);

  // Group cities by department for bulk creation
  const citiesByDepartment = cities.reduce((acc, city) => {
    if (!acc[city.departmentId]) {
      acc[city.departmentId] = [];
    }
    acc[city.departmentId].push(city);
    return acc;
  }, {} as Record<number, ApiCity[]>);

  // Create cities for each department
  for (const [deptId, deptCities] of Object.entries(citiesByDepartment)) {
    const provinceId = departmentMap.get(Number(deptId));
    if (!provinceId) {
      console.warn(`No matching province found for department ID ${deptId}`);
      continue;
    }

    await db.city.createMany({
      data: deptCities.map(city => ({
        name: city.name,
        provinceId: provinceId,
      })),
    });
    console.log(`Created ${deptCities.length} cities for department ID ${deptId}`);
  }

  console.log('Seed completed successfully');
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
