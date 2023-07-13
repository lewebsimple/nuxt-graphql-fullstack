import { version } from "../../../package.json";
import { builder } from "../builder";

export const healthcheck = () => {
  // Application version query
  builder.queryField("version", (t) =>
    t.string({
      description: "Current application version",
      resolve: () => `v${version}`,
    }),
  );

  // Ping mutation
  builder.mutationField("ping", (t) =>
    t.string({
      description: "Dummy mutation",
      resolve: () => "Pong!",
    }),
  );
};
