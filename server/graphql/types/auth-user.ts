import { builder } from "../builder";

export const user = () => {
  // AuthUser Prisma node
  builder.prismaNode("AuthUser", {
    id: { field: "id" },
    fields: (t) => ({
      email: t.exposeString("email"),
    }),
    authScopes: ({ id }, { session }) => session?.user.userId === id,
  });

  // authUsers query
  builder.queryField("authUsers", (t) =>
    t.prismaConnection({
      type: "AuthUser",
      cursor: "id",
      defaultSize: 2,
      totalCount: () => prisma.authUser.count(),
      resolve: (query, _root, _args, { prisma }) => prisma.authUser.findMany({ ...query }),
      authScopes: { isAuthenticated: true },
    }),
  );
};
