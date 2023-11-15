import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";

import { builder } from "./builder";
import * as types from "./types";

// Initialize builder
builder.queryType({});
builder.mutationType({});
//builder.subscriptionType({});
Function.prototype(types);

export const schema = builder.toSchema();

// Save GraphQL schema to file
if (process.env.NODE_ENV !== "production") {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  writeFileSync("generated/graphql/schema.graphql", schemaAsString);
}
