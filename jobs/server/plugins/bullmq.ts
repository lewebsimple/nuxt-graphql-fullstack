const queues = [dummyQueue];
const workers = [dummyWorker];

export default defineNitroPlugin(async (nitroApp) => {
  await Promise.all(Object.values(queues).map((queue) => queue.obliterate()));
  logger.success(`${Object.keys(queues).length} job queue(s) cleared`);

  Function.prototype(workers);
  logger.success(`${Object.keys(workers).length} job worker(s) started`);

  nitroApp.hooks.hookOnce("close", async () => {
    logger.info("Waiting for job workers to close...");
    await Promise.all(Object.values(workers).map((worker) => worker.close()));
    logger.success("Job workers closed");
  });
});
