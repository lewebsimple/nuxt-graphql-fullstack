<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "is-authenticated" });

useHead({ title: "Déconnexion" });
</script>

<template>
  <div id="page-auth-logout">
    <TheAuthPage title="Confirmez la déconnexion">
      <TheAuthLogoutForm />
    </TheAuthPage>
  </div>
</template>
