<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "has-auth-role", hasAuthRole: "ADMINISTRATOR" });

useHead({ title: "Inscription" });
</script>

<template>
  <div id="page-auth-signup">
    <TheAuthPage title="Veuillez vous inscrire">
      <FormAuthSignup />
    </TheAuthPage>
  </div>
</template>
