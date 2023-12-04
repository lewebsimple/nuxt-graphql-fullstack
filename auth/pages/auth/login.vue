<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "not-authenticated" });

useHead({ title: "Connexion" });
</script>

<template>
  <div id="page-auth-login">
    <TheAuthPage title="Veuillez vous identifier">
      <FormAuthLogin />
    </TheAuthPage>
  </div>
</template>
