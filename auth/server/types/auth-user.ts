import { AuthRole, type Prisma } from "@prisma/client";

import { SortOrderEnum } from "~/graphql/server/types/prisma";
import { type AuthUserFiltersMany, type AuthUserSort, AuthUserSortBy } from "~/graphql/utils/graphql";

export const AuthRoleEnumType = builder.enumType(AuthRole, { name: "AuthRole" });

export const AuthUserPrismaNode = builder.prismaNode("AuthUser", {
  id: { field: "id" },
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    role: t.expose("role", { type: AuthRoleEnumType }),
  }),
});

export const AuthUserWhereUniqueInput = builder.prismaWhereUnique("AuthUser", {
  name: "AuthUserWhereUnique",
  fields: (t) => ({
    email: t.field({ type: "String", required: true }),
  }),
});

export const AuthUserFiltersManyInput = builder.inputType("AuthUserFiltersMany", {
  fields: (t) => ({
    search: t.field({ type: "String", required: false }),
    role: t.field({ type: AuthRoleEnumType, required: false }),
  }),
});

export function authUserFiltersManyWhere(filters: AuthUserFiltersMany | undefined) {
  const where: Prisma.AuthUserWhereInput = {};
  if (filters?.search) {
    where.email = { contains: filters.search };
  }
  if (filters?.role) {
    where.role = filters.role;
  }
  return where;
}

export const AuthUserSortByEnum = builder.enumType("AuthUserSortBy", {
  values: ["email", "role"],
});

export const AuthUserSortInput = builder.inputType("AuthUserSort", {
  fields: (t) => ({
    by: t.field({ type: AuthUserSortByEnum, required: true }),
    order: t.field({ type: SortOrderEnum, required: true }),
  }),
});

export function auhtUserSortOrderBy(sort: AuthUserSort | undefined) {
  const orderBy: Prisma.AuthUserOrderByWithRelationInput = {};
  switch (sort?.by) {
    case AuthUserSortBy.Email:
      orderBy.email = sort.order;
      break;
    case AuthUserSortBy.Role:
      orderBy.role = sort.order;
      break;
  }
  return orderBy;
}

export const AuthUserQueries = builder.queryFields((t) => ({
  // Find unique AuthUser
  authUserFindUnique: t.prismaField({
    type: AuthUserPrismaNode,
    nullable: true,
    args: { where: t.arg({ type: AuthUserWhereUniqueInput, required: true }) },
    resolve: async (query, _root, { where }, { prisma }) => await prisma.authUser.findUnique({ ...query, where }),
  }),
  // Find many AuthUsers
  authUserFindMany: t.prismaConnection({
    type: AuthUserPrismaNode,
    cursor: "id",
    args: {
      filters: t.arg({ type: AuthUserFiltersManyInput, required: true }),
      sort: t.arg({ type: AuthUserSortInput, required: true }),
    },
    totalCount: async (_root, { filters }, { prisma }) => await prisma.authUser.count({ where: authUserFiltersManyWhere(<AuthUserFiltersMany>filters) }),
    resolve: async (query, _root, { filters, sort }, { prisma }) => {
      return await prisma.authUser.findMany({
        ...query,
        where: authUserFiltersManyWhere(<AuthUserFiltersMany>filters),
        orderBy: auhtUserSortOrderBy(<AuthUserSort>sort),
      });
    },
  }),
}));

export const AuthUserMutations = builder.mutationFields((t) => ({
  // Destroy many AuthUsers
  authUserDestroyMany: t.field({
    type: "Int",
    nullable: true,
    args: { authUserIds: t.arg.stringList({ required: true }) },
    resolve: async (_root, { authUserIds }) => {
      const { count } = await prisma.authUser.deleteMany({ where: { id: { in: authUserIds } } });
      return count;
    },
  }),
}));
