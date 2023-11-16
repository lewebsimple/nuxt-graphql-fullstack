import { type H3Event } from "h3";

// GraphQL Context
export function getContext(event: H3Event) {
  return {
    prisma,
    session: event.context.session,
  };
}

export type Context = ReturnType<typeof getContext>;
