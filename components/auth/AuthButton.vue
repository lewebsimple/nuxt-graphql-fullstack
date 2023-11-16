<script setup lang="ts">
const { isAuthenticated } = useAuth();
const buttonAttrs = {
  to: isAuthenticated ? "/auth/logout" : "/auth/login",
  label: isAuthenticated ? "Déconnexion" : "Connexion",
};
</script>

<template>
  <UButton color="gray" variant="link" :padded="false" v-bind="buttonAttrs" />
</template>
