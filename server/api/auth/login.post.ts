import { type Session } from "lucia";

import { type AuthLogin, authLoginSchema } from "~/composables/auth";
import { auth } from "~/server/lib/auth";

export default defineEventHandler(async (event) => {
  const result = {
    session: null as Session | null,
    error: null as string | null,
  };
  try {
    const { email, password } = authLoginSchema.parse(await readBody<AuthLogin>(event));
    const authRequest = auth.handleRequest(event);
    const key = await auth.useKey("email", email.toLowerCase(), password);
    result.session = await auth.createSession({
      userId: key.userId,
      attributes: { created_at: new Date() },
    });
    authRequest.setSession(result.session);
  } catch (error) {
    result.error = error instanceof Error ? error.message : (error as string);
  }
  return result;
});
