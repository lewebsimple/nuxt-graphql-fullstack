import { type Session } from "lucia";

export default defineNuxtPlugin(() => {
  useState<Session | null>("session", () => useRequestEvent().context.session);
});
