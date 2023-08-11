---
inject: true
to: server/utils/queues.ts
after: export const queues
skip_if: <%= name %>DataType
---
  <%= name %>: new Queue<<%= name %>DataType, <%= name %>ResultType>("<%= name %>", { connection }),