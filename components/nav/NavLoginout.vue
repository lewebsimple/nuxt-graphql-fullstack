<script setup lang="ts">
const { isAuthenticated } = useAuth();
const localePath = useLocalePath();
</script>

<template>
  <UButton v-if="isAuthenticated" :to="localePath('/auth/logout')" color="gray" variant="link">
    {{ $t("auth.logout") }}
  </UButton>
  <UButton v-else :to="localePath('/auth/login')" color="gray" variant="link">
    {{ $t("auth.login") }}
  </UButton>
</template>
