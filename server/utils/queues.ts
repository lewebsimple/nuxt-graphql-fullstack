import { Queue } from "bullmq";

import { type HealthcheckDataType, type HealthcheckReturnType } from "~/server/workers";

const { connection } = useRuntimeConfig().bullmq;

export const queues = {
  healthcheck: new Queue<HealthcheckDataType, HealthcheckReturnType>("healthcheck", { connection }),
};
