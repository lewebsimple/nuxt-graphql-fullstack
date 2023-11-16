// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["./app", "./auth", "./graphql", "./prisma"],
  modules: ["@nuxt/ui"],
  typescript: { typeCheck: true },
});
