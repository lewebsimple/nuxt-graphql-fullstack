<script setup lang="ts">
definePageMeta({ middleware: "has-auth-role", hasAuthRole: AuthRole.Administrator });
useHead({ title: "Utilisateurs" });
</script>

<template>
  <TheAuthUsers />
</template>
