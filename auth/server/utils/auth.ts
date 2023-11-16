import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import { h3 } from "lucia/middleware";

import { prisma } from "~/prisma/server/utils/prisma";

export const auth = lucia({
  adapter: prismaAdapter(prisma, {
    user: "authUser",
    key: "authKey",
    session: "authSession",
  }),
  env: process.dev ? "DEV" : "PROD",
  middleware: h3(),
  getUserAttributes: (data) => ({
    email: data.email,
    role: data.role,
  }),
  getSessionAttributes: (data) => ({
    created_at: data.created_at,
  }),
});

export type Auth = typeof auth;
