import { description } from "../package.json";

export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || description,
    },
  },
  tailwindcss: {
    cssPath: "~/app/assets/css/main.css",
    viewer: false,
  },
});
