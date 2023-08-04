import { type Server } from "http";

import { wsInitServer } from "../graphql/ws";

let isInitialized = false;

export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV !== "production" || isInitialized) return;
  const httpServer = (event.node.req.socket as any).server as Server;
  wsInitServer(httpServer);
  isInitialized = true;
});
