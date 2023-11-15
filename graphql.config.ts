import type { IGraphQLConfig } from "graphql-config";

export default {
  projects: {
    default: {
      schema: "generated/graphql/schema.graphql",
      documents: ["components/**/*.vue", "composables/**/*.ts"],
      extensions: {
        codegen: {
          generates: {
            "generated/graphql/": {
              preset: "client",
              config: {
                scalars: {
                  DateTime: "Date",
                  Upload: "File",
                },
                useTypeImports: true,
              },
              presetConfig: { fragmentMasking: false },
            },
          },
        },
      },
    },
  },
} satisfies IGraphQLConfig;
