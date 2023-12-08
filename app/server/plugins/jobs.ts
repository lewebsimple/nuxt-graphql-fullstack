import { type Queue, type Worker } from "bullmq";

const queues: Queue[] = [];
const workers: Worker[] = [];

export default defineNitroPlugin(async (nitroApp) => {
  if (queues.length) {
    // Clear all queues
    await Promise.all(queues.map((queue) => queue.obliterate({ force: true })));
    logger.success(`${queues.length} job queue(s) cleared`);
  }

  if (workers.length) {
    // Start all workers
    Function.prototype(workers);
    logger.success(`${workers.length} job worker(s) started`);

    // Close all workers on close
    nitroApp.hooks.hookOnce("close", async () => {
      logger.info("Waiting for job workers to close...");
      await Promise.all(workers.map((worker) => worker.close()));
      logger.success(`${workers.length} job workers closed`);
    });
  }
});
