export default defineEventHandler(async (event) => {
  const { email, password } = (await readBody<{ email: string; password: string }>(event)) ?? {};
  if (!email || !password) return { error: "Missing email / passowrd" };
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
    return null;
  } catch (error) {
    console.log(error);
    return { error: "Signup failed" };
  }
});
