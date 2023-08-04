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
  imports: { dirs: ["composables/generated"] },
  modules: ["@lewebsimple/nuxt3-svg", "@nuxthq/ui"],
  runtimeConfig: {
    bullmq: {
      connection: {
        host: process.env.NUXT_BULLMQ_CONNECTION_HOST || "localhost",
        port: parseInt(process.env.NUXT_BULLMQ_CONNECTION_PORT || "6379"),
      },
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
