<script setup lang="ts">
const { isAuthenticated } = useAuth();
const buttonAttrs = computed(() => ({
  to: isAuthenticated.value ? "/auth/logout" : "/auth/login",
  label: isAuthenticated.value ? "Déconnexion" : "Connexion",
}));
</script>

<template>
  <UButton color="gray" variant="link" :padded="false" v-bind="buttonAttrs" />
</template>
