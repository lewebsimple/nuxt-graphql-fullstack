import { printSchema } from "graphql";
import type { IGraphQLConfig } from "graphql-config";

import { schema } from "./server/graphql/schema";

const config: IGraphQLConfig = {
  projects: {
    default: {
      schema: printSchema(schema),
      documents: ["./components/**/*.vue", "composables/**/*.ts"],
      extensions: {
        codegen: {
          generates: {
            "./composables/generated/": {
              preset: "client",
              config: { avoidOptionals: true, useTypeImports: true },
            },
          },
        },
      },
    },
  },
};

export default config;
