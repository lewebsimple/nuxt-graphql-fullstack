import { description } from "../package.json";

export default defineNuxtConfig({
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
