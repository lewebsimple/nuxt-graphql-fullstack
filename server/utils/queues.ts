import { Queue } from "bullmq";

// Import worker types
import { type HealthcheckDataType, type HealthcheckResultType } from "~/server/workers/healthcheck";

const { redis: connection } = useRuntimeConfig();

export const queues = {
  Healthcheck: new Queue<HealthcheckDataType, HealthcheckResultType>("Healthcheck", { connection }),
};
