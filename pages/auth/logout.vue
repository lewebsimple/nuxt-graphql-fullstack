<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "is-authenticated" });
useHead({ title: "Logout" });
</script>

<template>
  <TheAuthPage id="page-logout" title="Logout of your account">
    <div class="space-y-4">
      <p class="text-center text-gray-500">Are you sure you want to logout ?</p>
      <TheLogoutForm />
    </div>
  </TheAuthPage>
</template>
