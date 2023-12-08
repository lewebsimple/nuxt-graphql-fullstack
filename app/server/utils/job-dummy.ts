import { logger } from "@nuxt/kit";
import { type Job, Queue, QueueEvents, Worker } from "bullmq";

const { connection } = useRuntimeConfig();

// Dummy job data / return types
export type DummyJobData = {};
export type DummyJobReturn = {
  message: string;
};

export const dummyQueue = new Queue<DummyJobData, DummyJobReturn>("DummyJob", { connection });
export const dummyQueueEvents = new QueueEvents("DummyJob", { connection });

export const dummyWorker = new Worker<DummyJobData, DummyJobReturn>(
  "DummyJob",
  async (job: Job<DummyJobData>) => {
    return { message: `Dummy job ${job.name} executed successfully` };
  },
  { connection },
)
  .on("failed", async (job, error) => {
    logger.error(`Dummy job ${job?.name} failed with error: ${error.message}`);
  })
  .on("completed", async (job) => {
    logger.success(job.returnvalue.message);
  });
