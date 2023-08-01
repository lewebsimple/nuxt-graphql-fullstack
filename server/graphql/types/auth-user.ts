import { builder } from "../builder";

// AuthUser Prisma node
export const authUserPrismaNode = builder.prismaNode("AuthUser", {
  id: { field: "id" },
  fields: (t) => ({
    email: t.exposeString("email"),
  }),
  authScopes: ({ id }, { session }) => session?.user.userId === id,
});

// authUsers query
export const authUsersQuery = builder.queryField("authUsers", (t) =>
  t.prismaConnection({
    type: "AuthUser",
    cursor: "id",
    defaultSize: 2,
    totalCount: () => prisma.authUser.count(),
    resolve: (query, _root, _args, { prisma }) => prisma.authUser.findMany({ ...query }),
    authScopes: { hasAuthRole: "ADMINISTRATOR" },
  }),
);
