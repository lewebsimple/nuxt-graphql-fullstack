<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "not-authenticated" });
defineI18nRoute({ paths: { fr: "/auth/connexion" } });
useHead({ title: "Connexion" });
</script>

<template>
  <div id="page-auth-login">
    <TheAuthPage :title="$t('auth.login_title')">
      <TheAuthLoginForm />
    </TheAuthPage>
  </div>
</template>
