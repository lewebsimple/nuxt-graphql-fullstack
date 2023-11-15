import { builder } from "./builder";
import * as types from "./types";

// Initialize builder
builder.queryType({});
//builder.mutationType({});
//builder.subscriptionType({});
Function.prototype(types);

export const schema = builder.toSchema();
