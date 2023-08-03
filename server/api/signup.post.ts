import { type Session } from "lucia";

export default defineEventHandler(async (event) => {
  const { email, password } = (await readBody<{ email: string; password: string }>(event)) ?? {};
  const result = {
    session: null as Session | null,
    error: null as string | null,
  };
  if (!email || !password) throw new Error("AUTH_SIGNUP_MISSING_EMAIL_PASSWORD");
  try {
    const user = await auth.createUser({
      key: {
        providerId: "email",
        providerUserId: email.toLowerCase(),
        password,
      },
      attributes: { email, role: "UNVERIFIED" },
    });
    result.session = await auth.createSession({
      userId: user.userId,
      attributes: { created_at: new Date() },
    });
    const authRequest = auth.handleRequest(event);
    authRequest.setSession(result.session);
  } catch (error) {
    //console.error(error);
    result.error = error instanceof Error ? error.message : (error as string);
  }
  return result;
});
