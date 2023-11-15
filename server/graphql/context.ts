import { type H3Event } from "h3";

import { prisma } from "~/server/lib/prisma";

// GraphQL Context
export function getContext(event: H3Event) {
  return {
    prisma,
    session: event.context.session,
  };
}

export type Context = ReturnType<typeof getContext>;
