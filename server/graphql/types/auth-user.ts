import { AuthRole, type Prisma } from "@prisma/client";

import { builder } from "../builder";
import { StringFilter } from "./prisma-input";

// AuthRole enum type
export const AuthRoleEnumType = builder.enumType(AuthRole, { name: "AuthRole" });

// AuthUser Prisma node
export const AuthUserPrismaNode = builder.prismaNode("AuthUser", {
  id: { field: "id" },
  fields: (t) => ({
    email: t.exposeString("email"),
    role: t.expose("role", { type: AuthRoleEnumType }),
  }),
  authScopes: ({ id }, { session }) => session?.user.userId === id || session?.user.role === "ADMINISTRATOR",
});

// authUsers query
export const AuthUsersQuery = builder.queryField("authUsers", (t) =>
  t.prismaConnection({
    type: "AuthUser",
    cursor: "id",
    args: {
      where: t.arg({
        type: builder.prismaWhere("AuthUser", {
          fields: {
            email: StringFilter,
            role: builder.prismaFilter(AuthRoleEnumType, { ops: ["equals", "in", "not", "notIn"] }),
          },
        }),
      }),
      orderBy: t.arg({
        type: builder.prismaOrderBy("AuthUser", {
          fields: {
            id: true,
            email: true,
          },
        }),
      }),
    },
    totalCount: (_parent, { where }, { prisma }) => prisma.authUser.count({ where: { ...(where ?? {}) } }),
    resolve: (query, _root, { where, orderBy }, { prisma }) =>
      prisma.authUser.findMany({
        ...query,
        where: { ...(where ?? {}) },
        orderBy: { ...(orderBy ?? {}) },
      }),
    authScopes: { hasAuthRole: "ADMINISTRATOR" },
  }),
);
