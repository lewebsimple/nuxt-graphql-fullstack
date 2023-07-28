import { version } from "../../../package.json";
import { builder } from "../builder";

// Application version query
export const versionQuery = builder.queryField("version", (t) =>
  t.string({
    description: "Current application version",
    resolve: () => `v${version}`,
  }),
);

// Ping mutation
export const pingMutation = builder.mutationField("ping", (t) =>
  t.string({
    description: "Dummy mutation",
    resolve: () => "Pong!",
  }),
);
