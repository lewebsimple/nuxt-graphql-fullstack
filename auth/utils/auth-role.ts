import { AuthRole } from "~/graphql/utils/graphql";

export function authRoleLabel(role: AuthRole) {
  switch (role) {
    case AuthRole.Administrator: {
      return "Administrateur";
    }
  }
}
