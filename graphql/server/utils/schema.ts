import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";

import * as appInfo from "~/app/server/types/app-info";
import * as authUser from "~/auth/server/types/auth-user";
import * as prisma from "~/graphql/server/types/prisma";
import * as scalars from "~/graphql/server/types/scalars";
import { AuthRole } from "~/graphql/utils/graphql";

// Initialize builder
builder.queryType({ authScopes: { hasAuthRole: AuthRole.Administrator } });
builder.mutationType({ authScopes: { hasAuthRole: AuthRole.Administrator } });
//builder.subscriptionType({});
Function.prototype({ appInfo, authUser, prisma, scalars });

export const schema = builder.toSchema();

// Save GraphQL schema to file
if (process.env.NODE_ENV !== "production") {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  writeFileSync("graphql/schema.graphql", schemaAsString);
}
