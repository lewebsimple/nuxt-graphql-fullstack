import { defineNuxtModule } from "@nuxt/kit";

import { wsInitServer } from "../server/graphql/ws";

export default defineNuxtModule({
  setup(_options, nuxt) {
    if (process.env.NODE_ENV !== "development") return;
    nuxt.hook("listen", (server) => {
      nuxt.hook("app:templatesGenerated", () => {
        wsInitServer(server);
      });
    });
  },
});
