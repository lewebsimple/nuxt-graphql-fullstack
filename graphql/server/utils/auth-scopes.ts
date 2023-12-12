import { AuthRole } from "~/graphql/utils/graphql";

export type AuthScopes = {
  public: boolean;
  isAuthenticated: boolean;
  hasAuthRole: AuthRole;
};

export const authScopes = async (context: Context) => ({
  public: true,
  isAuthenticated: !!context.session?.user,
  hasAuthRole: (role: AuthRole) => (context.session?.user ? [AuthRole.Administrator, role].includes(context.session.user.role) : false),
});
