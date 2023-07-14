<script setup lang="ts">
import { useQuery } from "@urql/vue";

const { isAuthenticated } = useAuth();
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
    <div class="container flex items-center">
      <div v-if="data?.version" class="text-sm text-gray-500">
        {{ data.version }}
      </div>
      <div class="ml-auto">
        <UButton v-if="isAuthenticated" to="/auth/logout" color="gray" variant="link">Logout</UButton>
        <UButton v-else to="/auth/login" color="gray" variant="link">Login</UButton>
      </div>
    </div>
  </footer>
</template>
