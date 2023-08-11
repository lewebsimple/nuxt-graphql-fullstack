---
inject: true
to: server/workers.ts
append: true
skip_if: ./workers/<%= filename %>;
---
export * from "./workers/<%= filename %>";