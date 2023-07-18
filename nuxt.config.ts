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
    public: {
      graphql: {
        url: "http://localhost:3000/api/graphql",
      },
      siteName: "Nuxt 3 GraphQL Fullstack Starter",
    },
  },
  tailwindcss: { viewer: false },
  typescript: { typeCheck: true },
});
