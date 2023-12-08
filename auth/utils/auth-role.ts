import { AuthRole } from "~/graphql/utils/graphql";

export function authRoleLabel(role: AuthRole) {
  switch (role) {
    case AuthRole.Unverified:
      return "Non vérifié";
    case AuthRole.Verified:
      return "Utilisateur";
    case AuthRole.Administrator:
      return "Administrateur";
  }
}

export function authRoleOptions(allowEmpty = false) {
  return [...(allowEmpty ? [{ value: "", label: "Tous les rôles" }] : []), ...Object.values(AuthRole).map((role) => ({ value: role, label: authRoleLabel(role) }))];
}
