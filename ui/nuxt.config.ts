export default defineNuxtConfig({
  components: [{ path: "~/ui/components", pathPrefix: false }],
  modules: ["@nuxt/ui"],
  tailwindcss: {
    cssPath: "~/ui/assets/css/main.css",
    viewer: false,
  },
});
