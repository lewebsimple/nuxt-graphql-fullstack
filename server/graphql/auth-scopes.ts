import { AuthRole } from "@prisma/client";

import { type Context } from "./context";

export type AuthScopes = {
  isAuthenticated: boolean;
  hasAuthRole: AuthRole;
};

export const authScopes = async (context: Context) => ({
  isAuthenticated: !!context.session?.user,
  hasAuthRole: (role: AuthRole) =>
    context.session?.user ? [AuthRole.ADMINISTRATOR, role].includes(context.session.user.role) : false,
});
