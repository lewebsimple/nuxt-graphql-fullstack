import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import { h3 } from "lucia/middleware";

export const auth = lucia({
  adapter: prismaAdapter(prisma, {
    modelNames: {
      user: "authUser",
      key: "authKey",
      session: "authSession",
    },
    userRelationKey: "user",
  }),
  env: process.dev ? "DEV" : "PROD",
  middleware: h3(),
  getUserAttributes: (data) => ({
    email: data.email,
  }),
  getSessionAttributes: (data) => ({
    createdAt: data.createdAt,
  }),
});

export type Auth = typeof auth;
