<script setup lang="ts">
import { useQuery } from "@urql/vue";

const { data } = await useQuery({
  query: graphql(`
    query Version {
      version
    }
  `),
});
</script>

<template>
  <div v-if="data?.version" class="text-sm text-gray-500">
    {{ data.version }}
  </div>
</template>
