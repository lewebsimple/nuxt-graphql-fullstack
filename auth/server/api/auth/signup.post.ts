import { type AuthSignup, authSignupSchema } from "~/auth/composables/auth";

export default defineEventHandler(async (event) => {
  if (event.context.session?.user?.role !== "ADMINISTRATOR") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const { email, password, role } = authSignupSchema.parse(await readBody<AuthSignup>(event));
  const user = await auth.createUser({
    key: { providerId: "email", providerUserId: email.toLowerCase(), password },
    attributes: { email: email.toLocaleLowerCase(), role },
  });
  return { user };
});
