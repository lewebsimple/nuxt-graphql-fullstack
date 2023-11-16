import { logger } from "@nuxt/kit";
import { type Job, Queue, Worker } from "bullmq";

const { connection } = useRuntimeConfig();

// Dummy job data / return types
export type DummyJobData = {};

export type DummyJobReturn = {
  message: string;
};

export const dummyQueue = new Queue("dummy", { connection });

export const dummyWorker = new Worker<DummyJobData, DummyJobReturn>(
  "dummy",
  async (job: Job<DummyJobData>) => {
    return { message: `Dummy job ${job.name} executed successfully` };
  },
  { connection },
);

dummyWorker.on("failed", async (job, error) => {
  logger.error(`Dummy job ${job?.name} failed with error: ${error.message}`);
});

dummyWorker.on("completed", async (job) => {
  logger.success(job.returnvalue.message);
});
