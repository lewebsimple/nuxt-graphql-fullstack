import { type Job, Worker } from "bullmq";
import { z } from "zod";

const { redis: connection } = useRuntimeConfig();

const HealthcheckDataTypeSchema = z.object({
  message: z.string(),
});
export type HealthcheckDataType = z.input<typeof HealthcheckDataTypeSchema>;

const HealthcheckResultTypeSchema = z.object({
  message: z.string(),
});
export type HealthcheckResultType = z.input<typeof HealthcheckResultTypeSchema>;

export const workerHealthcheck = new Worker<HealthcheckDataType, HealthcheckResultType>(
  "Healthcheck",
  async (job: Job) => {
    const data = HealthcheckDataTypeSchema.parse(job.data);
    console.log(`Healthcheck worker received message "${data.message}" from job named "${job.name}"`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return HealthcheckResultTypeSchema.parse({ message: `Good job, ${job.id}!` });
  },
  { connection },
);

workerHealthcheck.on("failed", (job, error) => {
  console.error(`Healthcheck job "${job?.name}" failed with error: ${error.message}`);
});

workerHealthcheck.on("completed", (job, result) => {
  console.log(`Healthcheck job "${job.name}" completed with result: ${result.message}`);
});
