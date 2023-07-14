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
  <footer class="py-1 bg-gray-100">
    <div class="container flex items-center justify-end">
      <div v-if="data?.version" class="text-sm">
        {{ data.version }}
      </div>
    </div>
  </footer>
</template>
