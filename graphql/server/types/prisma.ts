import { Prisma } from "@prisma/client";

export const SortOrderEnum = builder.enumType(Prisma.SortOrder, { name: "SortOrder" });
