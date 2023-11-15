import type { IGraphQLConfig } from "graphql-config";

export default {
  projects: {
    default: {
      schema: "generated/graphql/schema.graphql",
      documents: ["{pages|components}**/*.vue", "composables/**/*.ts"],
      extensions: {
        codegen: {
          generates: {
            "generated/graphql/": {
              preset: "client",
              config: {
                scalars: {
                  DateTime: "string",
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
