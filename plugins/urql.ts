import urql, { cacheExchange, fetchExchange, ssrExchange, subscriptionExchange } from "@urql/vue";
import { createClient as createWSClient, type SubscribePayload } from "graphql-ws";
import { WebSocket } from "ws";

import { useState } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const { httpEndpoint, wsEndpoint } = useRuntimeConfig().public.graphql;
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

  // WebSocket client
  const wsClient = createWSClient({
    url: wsEndpoint,
    webSocketImpl: process.server && WebSocket,
  });

  // Custom exchanges
  const exchanges = [
    cacheExchange,
    ssr,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => ({ unsubscribe: wsClient.subscribe(operation as SubscribePayload, sink) }),
      }),
    }),
  ];

  // Provide urql client
  const headers = { ...useRequestHeaders(), origin: useRequestURL().origin };
  nuxtApp.vueApp.use(urql, { url: httpEndpoint, exchanges, fetchOptions: { headers } });
});
