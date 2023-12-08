export default defineAppConfig({
  ui: {
    // Colors
    primary: "indigo",
    gray: "neutral",

    // Table
    table: {
      default: {
        // @see https://github.com/nuxt/ui/commit/f07968afef263d38183ce6c9cd9185ef7eee0494
        // loadingState: { label: "Chargement..." },
        // emptyState: { label: "Aucun élément" },
      },
      th: {
        base: "whitespace-nowrap",
      },
      td: {
        color: "text-black dark:text-white",
        size: "text-lg",
      },
    },
  },
});
