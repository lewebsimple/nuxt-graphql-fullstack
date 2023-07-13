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
  <footer>
    <div v-if="data?.version" class="version">
      {{ data.version }}
    </div>
  </footer>
</template>
