<script setup lang="ts">
import { gql, useQuery } from "@urql/vue";

const { data } = await useQuery({
  query: gql`
    {
      version
    }
  `,
});
</script>

<template>
  <footer>
    {{ data.version || "" }}
  </footer>
</template>
