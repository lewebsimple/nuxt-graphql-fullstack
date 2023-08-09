// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["@urql/vue"],
  },
  colorMode: { preference: "light" },
  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/assets/svg", extensions: ["svg"], prefix: "svg" },
  ],
  devtools: { enabled: true },
  i18n: {
    defaultLocale: "en",
    langDir: "locales",
    locales: [
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
      { code: "fr", iso: "fr-CA", file: "fr.json", name: "Français" },
    ],
  },
  imports: { dirs: ["composables/generated"] },
  modules: ["@lewebsimple/nuxt3-svg", "@nuxtjs/i18n", "@nuxthq/ui"],
  runtimeConfig: {
    redis: {
      host: process.env.NUXT_REDIS_HOST || "localhost",
      port: parseInt(process.env.NUXT_REDIS_PORT || "6379"),
    },
    public: {
      graphql: {
        httpEndpoint: "http://localhost:3000/api/graphql",
        wsEndpoint: "ws://localhost:3000/api/graphql",
      },
      siteName: "Nuxt 3 GraphQL Fullstack Starter",
    },
  },
  tailwindcss: { viewer: false },
  typescript: { typeCheck: true },
});
