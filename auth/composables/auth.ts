import { type Session } from "lucia";
import { z } from "zod";

import { AuthRole } from "~/graphql/utils/graphql";

// Authentication login schema
export const authLoginSchema = z.object({
  email: z.string().email("Courriel invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});
export type AuthLogin = z.infer<typeof authLoginSchema>;

export function useAuth() {
  // Session state initialized from server plugin / middleware
  const session = useState<Session | null>("session", () => null);

  // Authentication helpers
  const isAuthenticated = computed(() => !!session.value?.user);
  const isAdministrator = computed(() => hasAuthRole(AuthRole.Administrator));
  const hasAuthRole = (role: AuthRole) => session.value?.user && [AuthRole.Administrator, role].includes(session.value.user.role);

  // Login handler
  async function login(body: AuthLogin) {
    const { data, error } = await useFetch<{ session: Session | null }>("/api/auth/login", {
      method: "POST",
      body: { ...body },
      transform: (data) => ({
        ...data,
        session: (data.session
          ? {
              ...data.session,
              activePeriodExpiresAt: new Date(data.session.activePeriodExpiresAt),
              idlePeriodExpiresAt: new Date(data.session.idlePeriodExpiresAt),
            }
          : null) as Session | null,
      }),
      onResponseError: (context) => {
        throw new Error(context.response._data?.message);
      },
    });
    if (error.value) throw new Error(error.value.message);
    session.value = data.value?.session || null;
  }

  // Logout handler
  async function logout() {
    const { data, error } = await useFetch<{ session: Session | null }>("/api/auth/logout", {
      method: "POST",
      onResponseError: (context) => {
        throw new Error(context.response._data?.message);
      },
    });
    if (error.value) throw new Error(error.value.message);
    session.value = data.value?.session || null;
  }

  return { session, isAuthenticated, isAdministrator, hasAuthRole, login, logout };
}
