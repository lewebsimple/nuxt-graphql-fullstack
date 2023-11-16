import { createYoga } from "graphql-yoga";

export default defineEventHandler(async (event) => {
  const yoga = createYoga<Context>({
    schema,
    context: getContext(event),
    graphqlEndpoint: "/api/graphql",
    graphiql: process.env.NODE_ENV !== "production",
  });
  return yoga.handle(event.node.req, event.node.res);
});
