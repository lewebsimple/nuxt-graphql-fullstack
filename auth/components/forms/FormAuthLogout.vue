<script setup lang="ts">
const { logout } = useAuth();
async function onLogoutSubmit() {
  await logout();
  return "Déconnexion réussie";
}
</script>

<template>
  <UFormWrapper :submit-handler="onLogoutSubmit" submit-label="Déconnexion" @success="$router.push('/')" />
</template>
