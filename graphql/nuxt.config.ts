import codegen from "vite-plugin-graphql-codegen";

export default defineNuxtConfig({
  build: { transpile: ["@urql/vue"] },
  vite: { plugins: [codegen()] },
});
