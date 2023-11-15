import { type AuthRole } from "@prisma/client";

import { type Context } from "./context";

export type AuthScopes = {
  public: boolean;
  isAuthenticated: boolean;
  hasAuthRole: AuthRole;
};

export const authScopes = async (context: Context) => ({
  public: true,
  isAuthenticated: !!context.session?.user,
  hasAuthRole: (role: AuthRole) =>
    context.session?.user ? ["ADMINISTRATOR", role].includes(context.session.user.role) : false,
});
