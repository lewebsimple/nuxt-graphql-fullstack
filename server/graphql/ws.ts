import { createPubSub } from "@graphql-yoga/subscription";
import { execute, subscribe } from "graphql";
import { useServer } from "graphql-ws/lib/use/ws";
import { type Server } from "http";
import { WebSocketServer } from "ws";

import { prisma } from "../utils/prisma";
import { pubSub } from "../utils/pubsub";
import { schema } from "./schema";

export async function wsInitServer(httpServer: Server) {
  const wsServer = new WebSocketServer({ server: httpServer, path: "/api/graphql" });
  useServer(
    {
      schema,
      context: async ({ extra }) => {
        // TODO: Add session support using extra.request
        return { prisma, pubSub };
      },
      execute,
      subscribe,
    },
    wsServer,
  );
}
