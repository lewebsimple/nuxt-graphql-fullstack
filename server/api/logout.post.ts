export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session) {
    setResponseStatus(event, 401);
    return { session: null, error: "AUTH_LOGOUT_UNAUTHORIZED" };
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  return { session: null, error: null };
});
