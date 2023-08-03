import { DateResolver, DateTimeResolver } from "graphql-scalars";

import { builder } from "../builder";

export type Scalars = {
  Date: { Input: Date; Output: Date };
  DateTime: { Input: Date; Output: Date };
  Upload: { Input: File; Output: never };
};

export const Date = builder.addScalarType("Date", DateResolver, {});
export const DateTime = builder.addScalarType("DateTime", DateTimeResolver, {});
export const Upload = builder.scalarType("Upload", {
  serialize: () => {
    throw new Error("Uploads can only be used as input types");
  },
});
