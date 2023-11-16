// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["./app", "./auth", "./graphql", "./prisma"],
  typescript: { typeCheck: true },
});
