import type { IGraphQLConfig } from "graphql-config";

export default {
  projects: {
    // GraphQL schema
    schema: {
      schema: "http://localhost:3000/api/graphql",
      extensions: {
        codegen: {
          generates: {
            "generated/graphql/schema.graphql": {
              plugins: ["schema-ast"],
            },
          },
        },
      },
    },
  },
} satisfies IGraphQLConfig;
