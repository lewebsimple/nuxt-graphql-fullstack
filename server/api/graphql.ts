import { createYoga } from "graphql-yoga";

import { type Context, getContext } from "~/server/graphql/context";
import { schema } from "~/server/graphql/schema";

export default defineEventHandler(async (event) => {
  const yoga = createYoga<Context>({
    schema,
    context: getContext(event),
    graphqlEndpoint: "/api/graphql",
    graphiql: process.env.NODE_ENV !== "production",
  });
  return yoga.handle(event.node.req, event.node.res);
});
