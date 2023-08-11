---
to: server/prisma/seeds/<%= filename %>.ts
unless_exists: true
---
import type { SeedFn } from "../seed";

export const seed<%= name %>: SeedFn = async (prisma) => {
  return `<%= name %> success!`;
};
