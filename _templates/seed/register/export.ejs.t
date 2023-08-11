---
inject: true
to: server/prisma/seeds/index.ts
append: true
skip_if: export * from "./<%= filename %>";
---
export * from "./<%= filename %>";