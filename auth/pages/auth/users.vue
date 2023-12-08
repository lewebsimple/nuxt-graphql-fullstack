<script setup lang="ts">
definePageMeta({ middleware: "has-auth-role", hasAuthRole: "ADMINISTRATOR" });
useHead({ title: "Utilisateurs" });
</script>

<template>
  <TheAuthUsers />
</template>
