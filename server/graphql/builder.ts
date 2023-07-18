import SchemaBuilder from "@pothos/core";
// eslint-disable-next-line import/no-named-as-default
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import { Prisma } from "@prisma/client";

import { prisma } from "../utils/prisma";
import { type Context } from "./context";

// Pothos Schema Builder
export const builder = new SchemaBuilder<{
  AuthScopes: {
    isAuthenticated: boolean;
  };
  Context: Context;
  PrismaTypes: PrismaTypes;
}>({
  plugins: [ScopeAuthPlugin, PrismaPlugin],
  authScopes: async (context) => ({
    isAuthenticated: !!context.session,
  }),
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
    filterConnectionTotalCount: true,
  },
});
