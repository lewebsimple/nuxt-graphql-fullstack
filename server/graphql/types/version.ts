import { version } from "~/package.json";

import { builder } from "../builder";

// Application version query
export const VersionQuery = builder.queryField("version", (t) =>
  t.string({
    description: "Current application version",
    resolve: () => `v${version}`,
    authScopes: { public: true },
  }),
);
