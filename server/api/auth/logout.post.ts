import { auth } from "~/server/lib/auth";

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (session) {
    await auth.invalidateSession(session.sessionId);
    authRequest.setSession(null);
  }
  return { session: null };
});
