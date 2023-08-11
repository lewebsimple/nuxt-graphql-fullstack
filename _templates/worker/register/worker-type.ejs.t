---
inject: true
to: server/utils/queues.ts
append: true
skip_if: type <%= name %>DataType
---
import { type <%= name %>DataType, type <%= name %>ResultType } from "~/server/workers/<%= filename %>";