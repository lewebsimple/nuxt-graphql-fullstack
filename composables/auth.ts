import { type AuthRole } from "@prisma/client";
import { type Session } from "lucia";
import { z } from "zod";

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
  const hasAuthRole = (role: AuthRole) =>
    session.value?.user && ["ADMINISTRATOR", role].includes(session.value.user.role);

  // Login handler
  async function login({ email, password }: AuthLogin) {
    const result = await useFetch<{ session: Session | null; error: string | null }>("/api/auth/login", {
      method: "POST",
      body: { email, password },
      transform: (data) => ({
        ...data,
        session: (data.session
          ? { ...data.session, activePeriodExpiresAt: new Date(data.session.activePeriodExpiresAt) }
          : null) as Session | null,
      }),
    });
    session.value = result.data.value?.session || null;
    if (result.data.value?.error) throw new Error("La connexion a échoué");
  }

  // Logout handler
  async function logout() {
    const result = await useFetch<{ session: Session | null }>("/api/auth/logout", { method: "POST" });
    session.value = result.data.value?.session || null;
  }

  return { session, isAuthenticated, hasAuthRole, login, logout };
}
