---
to: server/workers/<%= filename %>.ts
unless_exists: true
---
import { type Job, Worker } from "bullmq";
import { z } from "zod";

const { redis: connection } = useRuntimeConfig();

const <%= name %>DataTypeSchema = z.object({
  message: z.string(),
});
export type <%= name %>DataType = z.input<typeof <%= name %>DataTypeSchema>;

const <%= name %>ResultTypeSchema = z.object({
  message: z.string(),
});
export type <%= name %>ResultType = z.input<typeof <%= name %>ResultTypeSchema>;

export const worker<%= name %> = new Worker<<%= name %>DataType, <%= name %>ResultType>(
  "<%= name %>",
  async (job: Job) => {
    const data = <%= name %>DataTypeSchema.parse(job.data);
    console.log(`<%= name %> worker received message "${data.message}" from job named "${job.name}"`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return <%= name %>ResultTypeSchema.parse({ message: `Good job, ${job.id}!` });
  },
  { connection },
);

worker<%= name %>.on("failed", (job, error) => {
  console.error(`<%= name %> job "${job?.name}" failed with error: ${error.message}`);
});

worker<%= name %>.on("completed", (job, result) => {
  console.log(`<%= name %> job "${job.name}" completed with result: ${result.message}`);
});
