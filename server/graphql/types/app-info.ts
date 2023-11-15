import { version } from "~/package.json";

import { builder } from "../builder";

// Application info queries
export const AppInfoQueries = builder.queryFields((t) => ({
  version: t.string({
    description: "Current application version",
    resolve: () => `v${version}`,
    authScopes: { public: true },
  }),
}));

// Application info mutations
export const AppInfoMutations = builder.mutationFields((t) => ({
  ping: t.string({
    resolve: () => "Pong",
    authScopes: { public: true },
  }),
}));
