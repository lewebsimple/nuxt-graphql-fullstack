import { builder } from "./builder";
import * as types from "./types";

// Initialize builder
builder.queryType({});
builder.mutationType({});
Function.prototype(types);

export const schema = builder.toSchema();
