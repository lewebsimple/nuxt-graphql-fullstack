<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "is-authenticated" });
defineI18nRoute({ paths: { fr: "/auth/deconnexion" } });
useHead({ title: "Déconnexion" });
</script>

<template>
  <div id="page-auth-logout">
    <TheAuthPage :title="$t('auth.logout_title')">
      <TheAuthLogoutForm />
    </TheAuthPage>
  </div>
</template>
