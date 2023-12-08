import { description } from "../package.json";

export default defineNuxtConfig({
  components: [
    { path: "~/app/components", pathPrefix: false },
    { path: "~/app/assets/svg", extensions: ["svg"], prefix: "Svg" },
  ],
  modules: ["@lewebsimple/nuxt3-svg"],
  runtimeConfig: {
    connection: {
      host: process.env.NUXT_REDIS_HOST || "localhost",
      port: parseInt(process.env.NUXT_REDIS_PORT || "6379"),
    },
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || description,
    },
  },
});
