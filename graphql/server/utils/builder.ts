import SchemaBuilder from "@pothos/core";
// eslint-disable-next-line import/no-named-as-default
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import RelayPlugin from "@pothos/plugin-relay";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import { Prisma } from "@prisma/client";

import { type Scalars } from "~/graphql/server/types/scalars";
import { type Context } from "~/graphql/server/utils/context";

// Pothos Schema Builder
export const builder = new SchemaBuilder<{
  AuthScopes: AuthScopes;
  Context: Context;
  PrismaTypes: PrismaTypes;
  Scalars: Scalars;
}>({
  authScopes,
  plugins: [
    ScopeAuthPlugin, // This plugin should always come first
    PrismaPlugin,
    PrismaUtils,
    RelayPlugin,
    SimpleObjectsPlugin,
  ],
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
    idFieldName: "globalId",
    decodeGlobalID,
    encodeGlobalID,
    nodeQueryOptions: false,
    nodesQueryOptions: false,
  },
  scopeAuthOptions: { authorizeOnSubscribe: true },
});
