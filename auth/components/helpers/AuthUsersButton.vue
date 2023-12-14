<script setup lang="ts">
const { isAdministrator } = useAuth();
</script>

<template>
  <UButton v-if="isAdministrator" color="gray" variant="link" to="/auth/users" label="Utilisateurs" />
</template>
