<script setup lang="ts">
const { authUsers } = await useAuthUsers();
</script>

<template>
  <TheAuthUsersTable :auth-users="authUsers" />
</template>
