import { db } from "@/lib/db";

const roles = [
  "GROWER",
  "CUPPER",
  "ADMIN",
  "USER",
];

async function main() {
  for (const name of roles) {
    await db.role.create({
      data: { name },
    });
  }
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
