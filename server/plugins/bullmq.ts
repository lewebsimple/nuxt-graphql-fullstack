import * as workers from "~/server/workers";

export default defineNitroPlugin(() => {
  Function.prototype(workers);
});
