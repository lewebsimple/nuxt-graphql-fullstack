import { builder } from "../builder";

export const user = () => {
  // AuthUser Prisma object
  builder.prismaObject("AuthUser", {
    fields: (t) => ({
      id: t.exposeID("id"),
      email: t.exposeString("email"),
    }),
  });
};
