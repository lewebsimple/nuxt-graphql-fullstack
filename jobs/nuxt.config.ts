export default defineNuxtConfig({
  runtimeConfig: {
    connection: {
      host: process.env.NUXT_REDIS_HOST || "localhost",
      port: parseInt(process.env.NUXT_REDIS_PORT || "6379"),
    },
  },
});
