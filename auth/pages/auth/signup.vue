<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "has-auth-role", hasAuthRole: "ADMINISTRATOR" });
defineI18nRoute({ paths: { fr: "/auth/inscription" } });
useHead({ title: "Inscription" });
</script>

<template>
  <div id="page-auth-signup">
    <TheAuthPage :title="$t('auth.signup_title')">
      <TheAuthSignupForm />
    </TheAuthPage>
  </div>
</template>
