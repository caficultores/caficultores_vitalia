import { db } from "@/lib/db";

const coffeeVarieties = [
  "Typica",
  "Bourbon",
  "Caturra",
  "Castillo",
  "Colombia",
  "Tabi",
  "Maragogipe",
  "Catuai",
  "San Bernardo",
  "Gesha (Geisha)",
  "Sidra",
  "Mokka",
  "Borbón Rosado",
  "Laurina",
  "Pacamara",
  "SL28",
  "SL34",
  "Mundo Novo",
  "Pacas",
  "Blue Mountain",
];

async function main() {
  for (const name of coffeeVarieties) {
    await db.coffeeVariety.create({
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
