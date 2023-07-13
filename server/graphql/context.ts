import { type H3Event } from "h3";

// GraphQL Context
export function getContext(event: H3Event) {
  return {
    auth: event.context.auth,
    prisma,
  };
}

export type Context = ReturnType<typeof getContext>;
