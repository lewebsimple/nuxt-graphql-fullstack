import { type AuthRole } from "@prisma/client";
import { type Session } from "lucia";

export function useAuth() {
  const session = useState<Session | null>("session", () => null);

  const isAuthenticated = computed(() => !!session.value?.user);
  const hasAuthRole = (role: AuthRole) =>
    session.value?.user && ["ADMINISTRATOR", role].includes(session.value.user.role);

  async function login(body: { email: string; password: string }) {
    const { session: newSession, error } = await $fetch<{ session: Session | null; error: string | null }>(
      "/api/login",
      { method: "POST", body },
    );
    session.value = newSession;
    if (error) throw new Error(error);
  }

  async function logout() {
    const { session: newSession, error } = await $fetch<{ session: null; error: string | null }>("/api/logout", {
      method: "POST",
    });
    session.value = newSession;
    if (error) throw new Error(error);
  }

  async function signup(body: { email: string; password: string }) {
    const { session: newSession, error } = await $fetch<{ session: Session | null; error: string | null }>(
      "/api/signup",
      { method: "POST", body },
    );
    session.value = newSession;
    if (error) throw new Error(error);
  }

  return { session, isAuthenticated, hasAuthRole, login, logout, signup };
}
