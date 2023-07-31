import { type Job, Worker } from "bullmq";

const { connection } = useRuntimeConfig().bullmq;

export type HealthcheckDataType = { message: string };
export type HealthcheckReturnType = string;

export const healthcheck = new Worker<HealthcheckDataType, HealthcheckReturnType>(
  "healthcheck",
  async (job: Job) => {
    console.log(`Healthcheck worker received message "${job.data.message}" from job ID ${job.id}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `Healthcheck worker completed job ID ${job.id}`;
  },
  { connection },
);

healthcheck.on("completed", (_job, result) => {
  console.log(result);
});
