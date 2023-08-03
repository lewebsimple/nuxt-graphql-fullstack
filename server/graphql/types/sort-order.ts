import { Prisma } from "@prisma/client";

import { builder } from "../builder";

export const SortOrderEnumType = builder.enumType(Prisma.SortOrder, { name: "SortOrder" });
