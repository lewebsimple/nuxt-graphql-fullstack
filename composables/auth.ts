import { AuthRole } from "@prisma/client";
import { type Session } from "lucia";

export function useAuth() {
  const session = useState<Session | null>("session", () => null);

  const isAuthenticated = computed(() => !!session.value?.user);
  const hasAuthRole = (role: AuthRole) =>
    session.value?.user && [AuthRole.ADMINISTRATOR, role].includes(session.value.user.role);

  async function login(body: { email: string; password: string }) {
    const { session: newSession, error } = (await $fetch("/api/login", { method: "POST", body })) as {
      session: Session | null;
      error: string | null;
    };
    session.value = newSession;
    if (error) throw new Error(error);
  }

  async function logout() {
    const { session: newSession, error } = await $fetch("/api/logout", { method: "POST" });
    session.value = newSession;
    if (error) throw new Error(error);
  }

  async function signup(body: { email: string; password: string }) {
    const { session: newSession, error } = (await $fetch("/api/signup", { method: "POST", body })) as {
      session: Session | null;
      error: string | null;
    };
    session.value = newSession;
    if (error) throw new Error(error);
  }

  return { session, isAuthenticated, hasAuthRole, login, logout, signup };
}
