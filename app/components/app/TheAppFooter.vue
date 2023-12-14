<script setup lang="ts">
const { isAdministrator } = useAuth();
</script>

<template>
  <footer class="py-2 bg-muted">
    <div class="container flex items-center gap-4">
      <AppVersion class="mr-auto" />
      <UButton v-if="isAdministrator" color="gray" variant="link" to="/auth/users" label="Utilisateurs" />
      <AuthButton />
    </div>
  </footer>
</template>
