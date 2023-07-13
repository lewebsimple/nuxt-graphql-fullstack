import SchemaBuilder from "@pothos/core";

import { type Context } from "./context";

// Pothos Schema Builder
export const builder = new SchemaBuilder<{ Context: Context }>({});
