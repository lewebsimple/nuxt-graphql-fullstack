import { version } from "~/package.json";

export const AppInfoQueries = builder.queryFields((t) => ({
  // Application version
  version: t.string({
    description: "Current application version",
    resolve: () => `v${version}`,
    skipTypeScopes: true,
  }),
}));

export const AppInfoMutations = builder.mutationFields((t) => ({
  // Dummy ping mutation
  ping: t.string({
    resolve: () => "Pong",
    skipTypeScopes: true,
  }),
}));
