import { builder } from "../builder";

// AuthUser Prisma node
export const AuthUserPrismaNode = builder.prismaNode("AuthUser", {
  id: { field: "id" },
  fields: (t) => ({
    email: t.exposeString("email"),
  }),
  authScopes: ({ id }, { session }) => session?.user.userId === id,
});

// authUsers query
export const AuthUsersQuery = builder.queryField("authUsers", (t) =>
  t.prismaConnection({
    type: "AuthUser",
    cursor: "id",
    totalCount: async (_parent, _args, { prisma }) => {
      return await prisma.authUser.count();
    },
    resolve: async (query, _root, _args, { prisma }) => {
      return await prisma.authUser.findMany({ ...query });
    },
    authScopes: { hasAuthRole: "ADMINISTRATOR" },
  }),
);
