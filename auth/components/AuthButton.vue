<script setup lang="ts">
const { isAuthenticated } = useAuth();
const buttonAttrs = computed(() => ({
  color: <any>"gray",
  variant: <any>"link",
  padded: false,
  to: isAuthenticated.value ? "/auth/logout" : "/auth/login",
  label: isAuthenticated.value ? "Déconnexion" : "Connexion",
}));
</script>

<template>
  <UButton v-bind="buttonAttrs" />
</template>
