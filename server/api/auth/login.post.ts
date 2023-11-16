import { type AuthLogin, authLoginSchema } from "~/composables/auth";
import { auth } from "~/server/lib/auth";

export default defineEventHandler(async (event) => {
  const { email, password } = authLoginSchema.parse(await readBody<AuthLogin>(event));
  const authRequest = auth.handleRequest(event);
  const key = await auth.useKey("email", email.toLowerCase(), password);
  const session = await auth.createSession({ userId: key.userId, attributes: { created_at: new Date() } });
  authRequest.setSession(session);
  return { session };
});
