export default defineEventHandler(async (event) => {
  const { email, password } = (await readBody<{ email: string; password: string }>(event)) ?? {};
  if (!email || !password) return { error: "Missing email / passowrd" };
  try {
    const authRequest = auth.handleRequest(event);
    const key = await auth.useKey("email", email, password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: { created_at: new Date() },
    });
    authRequest.setSession(session);
    return null;
  } catch (error) {
    console.log(error);
    return { error: "Login failed" };
  }
});
