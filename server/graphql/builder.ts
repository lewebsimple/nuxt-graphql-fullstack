import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";

import { type Context } from "./context";

// Pothos Schema Builder
export const builder = new SchemaBuilder<{
  AuthScopes: {
    isAuthenticated: boolean;
  };
  Context: Context;
}>({
  plugins: [ScopeAuthPlugin],
  authScopes: async (context) => ({
    isAuthenticated: !!context.session,
  }),
});
