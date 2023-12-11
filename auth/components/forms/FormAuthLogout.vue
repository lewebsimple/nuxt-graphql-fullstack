<script setup lang="ts">
const { logout } = useAuth();

async function onLogoutSubmit() {
  try {
    await logout();
    return "Déconnexion réussie";
  } catch (error) {
    switch ((<Error>error).message) {
      default:
        throw new Error("La déconnexion a échoué.");
    }
  }
}
</script>

<template>
  <UFormWrapper :submit-handler="onLogoutSubmit" submit-label="Déconnexion" @success="$router.push('/')" />
</template>
