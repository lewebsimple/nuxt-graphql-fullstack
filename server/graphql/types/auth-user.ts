import { AuthRole, type Prisma } from "@prisma/client";

import { builder } from "../builder";
import { SortOrderEnumType } from "./sort-order";

// AuthRole enum type
export const AuthRoleEnumType = builder.enumType(AuthRole, { name: "AuthRole" });

// AuthUser Prisma node
export const AuthUserPrismaNode = builder.prismaNode("AuthUser", {
  id: { field: "id" },
  fields: (t) => ({
    email: t.exposeString("email"),
    role: t.expose("role", { type: AuthRoleEnumType }),
  }),
  authScopes: ({ id }, { session }) => session?.user.userId === id,
});

// authUsers orderBy
export const AuthUsersOrderBy = {
  id: "id",
  email: "email",
  role: "role",
};
export type AuthUsersOrderBy = (typeof AuthUsersOrderBy)[keyof typeof AuthUsersOrderBy];
export const AuthUsersOrderByEnumType = builder.enumType(AuthUsersOrderBy, { name: "AuthUsersOrderBy" });

// authUsers input
export type AuthUsersInput = {
  orderBy?: AuthUsersOrderBy | null;
  order?: Prisma.SortOrder | null;
  role?: AuthRole | null;
};
export const AuthUsersInput = builder.inputRef<AuthUsersInput>("AuthUsersInput").implement({
  fields: (t) => ({
    orderBy: t.field({ type: AuthUsersOrderBy, required: false, defaultValue: "id" }),
    order: t.field({ type: SortOrderEnumType, required: false, defaultValue: "asc" }),
    role: t.field({ type: AuthRoleEnumType, required: false }),
  }),
});

const authUsersWhere = (input: AuthUsersInput): Prisma.AuthUserWhereInput => ({
  ...(input.role ? { role: { equals: input.role } } : {}),
});

const authUsersOrderBy = (input: AuthUsersInput): Prisma.AuthUserOrderByWithAggregationInput => ({
  ...(input.orderBy && input.order ? { [input.orderBy]: input.order } : {}),
});

// authUsers query
export const AuthUsersQuery = builder.queryField("authUsers", (t) =>
  t.prismaConnection({
    type: "AuthUser",
    cursor: "id",
    args: { input: t.arg({ type: AuthUsersInput, required: true }) },
    totalCount: (_parent, { input }, { prisma }) => prisma.authUser.count({ where: authUsersWhere(input) }),
    resolve: (query, _root, { input }, { prisma }) =>
      prisma.authUser.findMany({
        ...query,
        where: authUsersWhere(input),
        orderBy: authUsersOrderBy(input),
      }),
    authScopes: { hasAuthRole: "ADMINISTRATOR" },
  }),
);
