<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "not-authenticated" });
useHead({ title: "Sign up" });
</script>

<template>
  <TheAuthPage id="page-signup" title="Create an account">
    <TheSignupForm />
    <template #below>
      <p class="text-center text-sm text-gray-500">
        Already have an account?
        <UButton variant="link" to="/auth/login" :padded="false">Login here</UButton>
      </p>
    </template>
  </TheAuthPage>
</template>
