import type { SeedFn } from "../seed";

export const seedDummy: SeedFn = async (prisma) => {
  return `Dummy seed ran successfully!`;
};
