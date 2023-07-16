import urql, { cacheExchange, fetchExchange, ssrExchange } from "@urql/vue";

import { useState } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const ssr = ssrExchange({ isClient: process.client });
  const urqlState = useState<ReturnType<typeof ssr.extractData>>("urql");

  // Extract SSR payload on the server
  if (process.server) {
    nuxtApp.hook("app:rendered", () => {
      urqlState.value = ssr.extractData();
    });
  }

  // Restore SSR payload on the client
  if (process.client) {
    nuxtApp.hook("app:created", () => {
      ssr.restoreData(urqlState.value);
    });
  }

  // Custom exchanges
  const exchanges = [cacheExchange, ssr, fetchExchange];

  // Provide urql client
  const { url } = useRuntimeConfig().public.graphql;
  nuxtApp.vueApp.use(urql, { url, exchanges, fetchOptions: { headers: useRequestHeaders() } });
});
