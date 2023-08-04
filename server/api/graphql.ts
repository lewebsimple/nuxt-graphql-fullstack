import { createYoga } from "graphql-yoga";

import { type Context, getContext } from "../graphql/context";
import { schema } from "../graphql/schema";

export default defineEventHandler(async (event) => {
  const yoga = createYoga<Context>({
    schema,
    context: getContext(event),
    graphqlEndpoint: "/api/graphql",
    graphiql: { subscriptionsProtocol: "WS" },
  });
  return yoga.handle(event.node.req, event.node.res);
});
