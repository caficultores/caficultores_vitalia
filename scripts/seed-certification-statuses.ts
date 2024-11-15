import { db } from "@/lib/db";

const certificationStatuses = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED"
];

async function main() {
  for (const name of certificationStatuses) {
    await db.certificationStatus.create({
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
