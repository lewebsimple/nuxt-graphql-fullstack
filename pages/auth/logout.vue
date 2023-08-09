<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "is-authenticated" });
defineI18nRoute({ paths: { fr: "/auth/deconnexion" } });
const { t } = useI18n({ useScope: "local" });
useHead({ title: t("title") });
</script>

<template>
  <TheAuthPage id="page-logout" :title="t('logout')">
    <div class="space-y-4">
      <p class="text-center text-gray-500">
        {{ t("confirmLogout") }}
      </p>
      <TheLogoutForm />
    </div>
  </TheAuthPage>
</template>

<i18n lang="yaml">
en:
  title: Logout
  logout: Logout of your account
  confirmLogout: Are you sure you want to logout?
fr:
  title: Déconnexion
  logout: Déconnectez-vous de votre compte
  confirmLogout: Êtes-vous sûr de vouloir vous déconnecter?
</i18n>
