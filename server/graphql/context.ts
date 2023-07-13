import { type H3Event } from "h3";

// GraphQL Context
export function getContext(event: H3Event) {
  return {
    session: event.context.session,
    prisma,
  };
}

export type Context = ReturnType<typeof getContext>;
