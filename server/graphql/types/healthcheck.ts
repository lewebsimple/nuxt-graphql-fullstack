import { version } from "../../../package.json";
import { builder } from "../builder";

// Application version query
export const VersionQuery = builder.queryField("version", (t) =>
  t.string({
    description: "Current application version",
    resolve: () => `v${version}`,
  }),
);

// Ping mutation
export const PingMutation = builder.mutationField("ping", (t) =>
  t.string({
    description: "Publish messages to pong subscription",
    args: {
      message: t.arg.string({ required: true, defaultValue: "Pong!" }),
    },
    resolve: (_parent, { message }, { pubSub }) => {
      pubSub.publish("pong", message);
      return message;
    },
  }),
);

// Pong subscription
export const PongSubscription = builder.subscriptionField("pong", (t) =>
  t.string({
    description: "Subscribe to messages sent by ping mutation",
    subscribe: (_parent, _args, { pubSub }) => pubSub.subscribe("pong"),
    resolve: (pong) => pong,
  }),
);
