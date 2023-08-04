import { createRedisEventTarget } from "@graphql-yoga/redis-event-target";
import { createPubSub } from "graphql-yoga";
import { Redis } from "ioredis";

// We don't have access to useRuntimeConfig() here, so we need to use this:
const redis = {
  host: process.env.NUXT_REDIS_HOST || "localhost",
  port: parseInt(process.env.NUXT_REDIS_PORT || "6379"),
};

const publishClient = new Redis(redis);
const subscribeClient = new Redis(redis);

const eventTarget = createRedisEventTarget({
  publishClient,
  subscribeClient,
});

export type PubSubChannels = {
  pong: [string];
};

export const pubSub = createPubSub<PubSubChannels>({ eventTarget });
