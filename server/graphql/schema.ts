import { builder } from "./builder";
import * as types from "./types";

// Initialize builder
builder.queryType({});
builder.mutationType({});
Object.values(types).forEach((type) => type());

export const schema = builder.toSchema();
