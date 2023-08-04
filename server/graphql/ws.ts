import { createPubSub } from "@graphql-yoga/subscription";
import { execute, subscribe } from "graphql";
import { useServer } from "graphql-ws/lib/use/ws";
import { type Server } from "http";
import { WebSocketServer } from "ws";

import { auth } from "../utils/auth";
import { prisma } from "../utils/prisma";
import { pubSub } from "../utils/pubsub";
import { type Context } from "./context";
import { schema } from "./schema";

export async function wsInitServer(httpServer: Server) {
  const wsServer = new WebSocketServer({ server: httpServer, path: "/api/graphql" });
  useServer(
    {
      schema,
      context: async ({ extra }): Promise<Context> => {
        // TODO: Add CSRF protection against extra.request.headers.host
        const sessionId = auth.readSessionCookie(extra.request.headers.cookie);
        const session = sessionId ? await auth.validateSession(sessionId) : null;
        return { session, prisma, pubSub };
      },
      execute,
      subscribe,
    },
    wsServer,
  );
}
