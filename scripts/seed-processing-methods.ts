import { db } from "@/lib/db";

const processingMethods = [
  "Lavado",
  "Natural",
  "Honey Amarillo",
  "Honey Rojo",
  "Honey Negro",
  "Anaeróbico",
  "Fermentación prolongada",
  "Semi-lavado",
  "Descafeinado",
  "Giling Basah",
  "Carbonic Maceration",
  "Wet Hulled",
  "Experimental",
];

async function main() {
  for (const name of processingMethods) {
    await db.processingMethod.create({
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
