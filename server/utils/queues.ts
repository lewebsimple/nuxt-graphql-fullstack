import { Queue } from "bullmq";

import { type HealthcheckDataType, type HealthcheckResultType } from "~/server/workers";

const { redis: connection } = useRuntimeConfig();

export const queues = {
  Healthcheck: new Queue<HealthcheckDataType, HealthcheckResultType>("Healthcheck", { connection }),
};
