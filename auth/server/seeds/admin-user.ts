import { auth } from "~/auth/server/utils/auth";
import { AuthRole } from "~/graphql/utils/graphql";
import type { SeedFn } from "~/prisma/server/seed";

export const seedAdminUser: SeedFn = async (prisma) => {
  const adminUserData = {
    email: process.env.SEED_ADMIN_EMAIL || "admin@example.com",
    password: process.env.SEED_ADMIN_PASSWORD || "changeme",
    role: AuthRole.Administrator,
  };
  const existing = await prisma.authUser.findUnique({
    where: { email: adminUserData.email },
  });
  if (existing) {
    await auth.updateUserAttributes(existing.id, { role: adminUserData.role });
  } else {
    await auth.createUser({
      key: {
        providerId: "email",
        providerUserId: adminUserData.email,
        password: adminUserData.password,
      },
      attributes: { email: adminUserData.email, role: adminUserData.role },
    });
  }
  return adminUserData.email;
};
