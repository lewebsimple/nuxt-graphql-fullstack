import { AuthRole } from "@prisma/client";

// AuthRole type and filter
export const AuthRoleEnumType = builder.enumType(AuthRole, { name: "AuthRole" });

export const AuthRoleFilter = builder.prismaFilter(AuthRole, {
  ops: ["equals", "in", "notIn"],
});

// AuthUser Prisma node, Where and OrderBy inputs
export const AuthUserPrismaNode = builder.prismaNode("AuthUser", {
  id: { field: "id" },
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    role: t.expose("role", { type: AuthRoleEnumType }),
  }),
});

export const AuthUserUniqueFilter = builder.prismaWhereUnique("AuthUser", {
  fields: (t) => ({
    email: t.field({ type: "String", required: true }),
  }),
});

export const AuthUserFilter = builder.prismaWhere("AuthUser", {
  fields: (t) => ({
    role: AuthRoleFilter,
  }),
});

export const AuthUserOrderByInput = builder.prismaOrderBy("AuthUser", {
  fields: {
    email: true,
    role: true,
  },
});

export const AuthUserQueries = builder.queryFields((t) => ({
  authUsers: t.prismaConnection({
    type: "AuthUser",
    cursor: "id",
    args: {
      where: t.arg({ type: AuthUserFilter, required: true }),
      orderBy: t.arg({ type: AuthUserOrderByInput, required: true }),
    },
    totalCount: async (_root, { where }, { prisma }) => await prisma.authUser.count({ where }),
    resolve: async (query, _root, { where, orderBy }, { prisma }) => await prisma.authUser.findMany({ ...query, where, orderBy }),
  }),
}));
