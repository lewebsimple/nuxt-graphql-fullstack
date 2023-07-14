<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "not-authenticated" });
useHead({ title: "Login" });
</script>

<template>
  <TheAuthPage id="page-login" title="Login to your account">
    <TheLoginForm />
    <template #below>
      <p class="text-center text-sm text-gray-500">
        Don't have an account?
        <UButton variant="link" to="/auth/signup" :padded="false">Sign up here</UButton>
      </p>
    </template>
  </TheAuthPage>
</template>
