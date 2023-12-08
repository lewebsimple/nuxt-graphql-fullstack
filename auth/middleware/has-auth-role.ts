import { AuthRole } from "~/graphql/utils/graphql";

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, hasAuthRole } = useAuth();
  if (!isAuthenticated.value) {
    return navigateTo(`/auth/login?redirect=${to.fullPath}`);
  } else if (!hasAuthRole(to.meta.hasAuthRole || AuthRole.Administrator)) {
    abortNavigation({ statusCode: 403, statusMessage: "Opération non permise" });
  }
});

declare module "#app" {
  interface PageMeta {
    hasAuthRole?: AuthRole;
  }
}
