import { logger } from "@nuxt/kit";
import { type Job, Queue, QueueEvents, Worker } from "bullmq";
import { z } from "zod";

const { connection } = useRuntimeConfig();

// Dummy job data / return types
const dummyJobDataSchema = z.object({});
export type DummyJobData = z.infer<typeof dummyJobDataSchema>;
export type DummyJobReturn = { message: string };

export const dummyQueue = new Queue<DummyJobData, DummyJobReturn>("DummyJob", { connection });
export const dummyQueueEvents = new QueueEvents("DummyJob", { connection });

export const dummyWorker = new Worker<DummyJobData, DummyJobReturn>(
  "DummyJob",
  async (job: Job<DummyJobData>) => {
    dummyJobDataSchema.parse(job.data);
    return { message: `DummyJob ${job.name} executed successfully` };
  },
  { connection },
)
  .on("failed", async (job, error) => {
    logger.error(`DummyJob ${job?.name} failed with error: ${error.message}`);
  })
  .on("completed", async (job) => {
    logger.success(job.returnvalue.message);
  });
