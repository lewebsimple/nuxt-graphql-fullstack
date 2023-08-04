import { createRedisEventTarget } from "@graphql-yoga/redis-event-target";
import { createPubSub } from "graphql-yoga";
import { Redis } from "ioredis";

const publishClient = new Redis();
const subscribeClient = new Redis();

const eventTarget = createRedisEventTarget({
  publishClient,
  subscribeClient,
});

export type PubSubChannels = {
  pong: [string];
};

export const pubSub = createPubSub<PubSubChannels>({ eventTarget });
