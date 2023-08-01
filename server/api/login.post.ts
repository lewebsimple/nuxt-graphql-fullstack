import { type Session } from "lucia";

export default defineEventHandler(async (event) => {
  const { email, password } = (await readBody<{ email: string; password: string }>(event)) ?? {};
  const result = {
    session: null as Session | null,
    error: null as string | null,
  };
  if (!email || !password) throw new Error("AUTH_LOGIN_MISSING_EMAIL_PASSWORD");
  try {
    const authRequest = auth.handleRequest(event);
    const key = await auth.useKey("email", email.toLowerCase(), password);
    result.session = await auth.createSession({
      userId: key.userId,
      attributes: { created_at: new Date() },
    });
    authRequest.setSession(result.session);
  } catch (error) {
    //console.error(error);
    result.error = error instanceof Error ? error.message : (error as string);
  }
  return result;
});
