export default defineEventHandler(async (event) => {
  const { email, password } = (await readBody<{ email: string; password: string }>(event)) ?? {};
  if (!email || !password) throw new Error("AUTH_SIGNUP_MISSING_EMAIL_PASSWORD");
  try {
    const user = await auth.createUser({
      key: {
        providerId: "email",
        providerUserId: email,
        password,
      },
      attributes: { email },
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: { created_at: new Date() },
    });
    const authRequest = auth.handleRequest(event);
    authRequest.setSession(session);
    return { session, error: null };
  } catch (error) {
    //console.error(error);
    return { session: null, error: "Signup failed" };
  }
});
