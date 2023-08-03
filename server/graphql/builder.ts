import SchemaBuilder from "@pothos/core";
// eslint-disable-next-line import/no-named-as-default
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import RelayPlugin from "@pothos/plugin-relay";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import { Prisma } from "@prisma/client";

import { prisma } from "../utils/prisma";
import { type AuthScopes, authScopes } from "./auth-scopes";
import { type Context } from "./context";
import { type Scalars } from "./types/scalars";

// Pothos Schema Builder
export const builder = new SchemaBuilder<{
  AuthScopes: AuthScopes;
  Context: Context;
  PrismaTypes: PrismaTypes;
  Scalars: Scalars;
}>({
  plugins: [ScopeAuthPlugin, PrismaPlugin, RelayPlugin],
  authScopes,
  prisma: { client: prisma, dmmf: Prisma.dmmf, filterConnectionTotalCount: true },
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "ID",
    encodeGlobalID: (typename: string, id: string | number | bigint) => `${typename}:${id}`,
    decodeGlobalID: (globalID: string) => {
      const [typename, id] = globalID.split(":");
      return { typename, id };
    },
  },
});
