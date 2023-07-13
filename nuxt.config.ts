// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["@urql/vue"],
  },
  components: [{ path: "~/components", pathPrefix: false }],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      graphql: {
        url: "http://localhost:3000/api/graphql",
      },
      siteName: "Nuxt 3 GraphQL Fullstack Starter",
    },
  },
  typescript: { typeCheck: true },
});
