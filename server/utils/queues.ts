import { Queue } from "bullmq";

import { type HealthcheckDataType, type HealthcheckReturnType } from "~/server/workers";

const { redis: connection } = useRuntimeConfig();

export const queues = {
  healthcheck: new Queue<HealthcheckDataType, HealthcheckReturnType>("healthcheck", { connection }),
};
