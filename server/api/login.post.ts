export default defineEventHandler(async (event) => {
  const { email, password } = (await readBody<{ email: string; password: string }>(event)) ?? {};
  if (!email || !password) throw new Error("AUTH_LOGIN_MISSING_EMAIL_PASSWORD");
  try {
    const authRequest = auth.handleRequest(event);
    const key = await auth.useKey("email", email, password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: { created_at: new Date() },
    });
    authRequest.setSession(session);
    return { session, error: null };
  } catch (error) {
    //console.error(error);
    return { session: null, error: "AUTH_LOGIN_FAILED" };
  }
});
