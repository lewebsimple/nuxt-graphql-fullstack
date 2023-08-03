import { builder } from "../builder";

export const StringFilter = builder.prismaFilter("String", {
  ops: ["contains", "equals", "startsWith", "not"],
});
