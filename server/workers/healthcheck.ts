import { type Job, Worker } from "bullmq";
import { z } from "zod";

const { redis: connection } = useRuntimeConfig();

const HealthCheckDataTypeSchema = z.object({
  message: z.string(),
});
export type HealthcheckDataType = z.input<typeof HealthCheckDataTypeSchema>;

const HealthcheckReturnTypeSchema = z.string();
export type HealthcheckReturnType = z.input<typeof HealthcheckReturnTypeSchema>;

export const healthcheck = new Worker<HealthcheckDataType, HealthcheckReturnType>(
  "healthcheck",
  async (job: Job) => {
    const data = HealthCheckDataTypeSchema.parse(job.data);
    console.log(`Healthcheck worker received message "${data.message}" from job ID ${job.id}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `Healthcheck worker completed job ID ${job.id}`;
  },
  { connection },
);

healthcheck.on("completed", (_job, result) => {
  console.log(result);
});
