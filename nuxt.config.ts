// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["./app", "./auth", "./graphql", "./jobs", "./prisma"],
  typescript: { typeCheck: true },
  vite: { build: { sourcemap: process.env.NODE_ENV === "production" ? true : "inline" } },
});
