import { type Prisma, prisma } from "../utils/prisma";
import * as seeds from "./seeds";

export type SeedFn = (prisma: Prisma) => Promise<any>;

async function main() {
  for (const [seedName, seedFn] of Object.entries(seeds)) {
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
