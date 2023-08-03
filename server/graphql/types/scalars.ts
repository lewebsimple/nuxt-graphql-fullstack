import { DateResolver, DateTimeResolver } from "graphql-scalars";

import { builder } from "../builder";

export type Scalars = {
  Date: {
    Input: Date;
    Output: Date;
  };
  DateTime: {
    Input: Date;
    Output: Date;
  };
};

export const Date = builder.addScalarType("Date", DateResolver, {});
export const DateTime = builder.addScalarType("DateTime", DateTimeResolver, {});
