import { AuthRole } from "@prisma/client";
import { type Session, type User } from "lucia";
import { z } from "zod";

// Authentication login schema
export const authLoginSchema = z.object({
  email: z.string().email("Courriel invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});
export type AuthLogin = z.infer<typeof authLoginSchema>;

// Authentication signup schema
export const authSignupSchema = z.object({
  email: z.string().email("Courriel invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  role: z.nativeEnum(AuthRole),
});
export type AuthSignup = z.infer<typeof authSignupSchema>;

export function useAuth() {
  // Session state initialized from server plugin / middleware
  const session = useState<Session | null>("session", () => null);

  // Authentication helpers
  const isAuthenticated = computed(() => !!session.value?.user);
  const hasAuthRole = (role: AuthRole) =>
    session.value?.user &&
    ["ADMINISTRATOR", role].includes(session.value.user.role);

  // Login handler
  async function login(body: AuthLogin) {
    const { data, error } = await useFetch<{ session: Session | null }>(
      "/api/auth/login",
      {
        method: "POST",
        body,
        transform: (data) => ({
          ...data,
          session: (data.session
            ? {
                ...data.session,
                activePeriodExpiresAt: new Date(
                  data.session.activePeriodExpiresAt,
                ),
                idlePeriodExpiresAt: new Date(data.session.idlePeriodExpiresAt),
              }
            : null) as Session | null,
        }),
      },
    );
    if (error.value) throw new Error(error.value.statusMessage);
    session.value = data.value?.session || null;
  }

  // Logout handler
  async function logout() {
    const { data, error } = await useFetch<{ session: Session | null }>(
      "/api/auth/logout",
      { method: "POST" },
    );
    if (error.value) throw new Error(error.value.statusMessage);
    session.value = data.value?.session || null;
  }

  // Signup handler
  async function signup(body: AuthSignup) {
    const { data, error } = await useFetch<{ user: User }>("api/auth/signup", {
      method: "POST",
      body,
    });
    if (error.value) throw new Error(error.value.statusMessage);
    return data.value?.user || null;
  }

  return { session, isAuthenticated, hasAuthRole, login, logout, signup };
}
