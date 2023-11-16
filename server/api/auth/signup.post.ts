import { type AuthSignup, authSignupSchema } from "~/composables/auth";
import { auth } from "~/server/lib/auth";

export default defineEventHandler(async (event) => {
  if (event.context.session?.user?.role !== "ADMINISTRATOR") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const { email, password, role } = authSignupSchema.parse(await readBody<AuthSignup>(event));
  const user = await auth.createUser({
    key: { providerId: "email", providerUserId: email, password },
    attributes: { email, role },
  });
  return { user };
});
