import { type AuthRole } from "@prisma/client";

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, hasAuthRole } = useAuth();
  const { $i18n } = useNuxtApp();
  if (!isAuthenticated.value) {
    return navigateTo(`/auth/login?redirect=${to.fullPath}`);
  } else if (!hasAuthRole(to.meta.hasAuthRole || "ADMINISTRATOR")) {
    abortNavigation({ statusCode: 403, statusMessage: $i18n.t("auth.unauthorized") });
  }
});

declare module "#app" {
  interface PageMeta {
    hasAuthRole?: AuthRole;
  }
}
