import { DateResolver, DateTimeResolver } from "graphql-scalars";

import { builder } from "../builder";

export const Date = builder.addScalarType("Date", DateResolver, {});
export const DateTime = builder.addScalarType("DateTime", DateTimeResolver, {});
