// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["./app", "./auth", "./graphql", "./jobs", "./prisma"],
  i18n: {
    defaultLocale: "en",
    langDir: "locales",
    locales: [
      { code: "en", iso: "en-US", file: "en.yaml", name: "English" },
      { code: "fr", iso: "fr-CA", file: "fr.yaml", name: "Français" },
    ],
  },
  modules: ["@nuxtjs/i18n"],
  typescript: { typeCheck: true },
  vite: { build: { sourcemap: process.env.NODE_ENV === "production" ? true : "inline" } },
});
