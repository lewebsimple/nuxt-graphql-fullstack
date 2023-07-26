import { type Session } from "lucia";

export function useAuth() {
  const session = useState<Session | null>("session", () => null);

  const isAuthenticated = computed(() => !!session.value?.user);

  async function login(body: { email: string; password: string }) {
    const { session: newSession, error } = await $fetch("/api/login", { method: "POST", body });
    session.value = newSession as Session | null;
    if (error) throw new Error(error);
  }

  async function logout() {
    const { session: newSession, error } = await $fetch("/api/logout", { method: "POST" });
    session.value = newSession as Session | null;
    if (error) throw new Error(error);
  }

  async function signup(body: { email: string; password: string }) {
    const { session: newSession, error } = await $fetch("/api/signup", { method: "POST", body });
    session.value = newSession as Session | null;
    if (error) throw new Error(error);
  }

  return { session, isAuthenticated, login, logout, signup };
}
1;
