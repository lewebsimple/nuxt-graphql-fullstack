import { seedAdminUser } from "~/auth/server/seeds/admin-user";
import { prisma, type PrismaClient } from "~/prisma/server/utils/prisma";

export type SeedFn = (prisma: PrismaClient) => Promise<any>;

async function main() {
  for (const [seedName, seedFn] of Object.entries({ seedAdminUser })) {
    console.log("\n🌱 " + seedName);
    console.log(await seedFn(prisma));
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
