import { description } from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: { transpile: ["@urql/vue"] },
  extends: ["./auth"],
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || description,
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    viewer: false,
  },
  typescript: { typeCheck: true },
});
