import { DateTimeResolver } from "graphql-scalars";

import { builder } from "../builder";

export type Scalars = {
  DateTime: { Input: Date; Output: Date };
  Upload: { Input: File; Output: never };
};

export const DateTimeScalar = builder.addScalarType(
  "DateTime",
  DateTimeResolver,
  {},
);

export const UploadScalar = builder.scalarType("Upload", {
  serialize: () => {
    throw new Error("Uploads can only be used as input types");
  },
});
