import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";

import * as appInfo from "~/app/server/types/app-info";
import * as authUser from "~/auth/server/types/auth-user";
import * as scalars from "~/graphql/server/types/scalars";

// Initialize builder
builder.queryType({});
builder.mutationType({});
//builder.subscriptionType({});
Function.prototype({ appInfo, authUser, scalars });

export const schema = builder.toSchema();

// Save GraphQL schema to file
if (process.env.NODE_ENV !== "production") {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  writeFileSync("graphql/schema.graphql", schemaAsString);
}
