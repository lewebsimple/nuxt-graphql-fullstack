<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "not-authenticated" });
defineI18nRoute({ paths: { fr: "/auth/connexion" } });
const { t } = useI18n({ useScope: "local" });
const localePath = useLocalePath();
useHead({ title: t("title") });
</script>

<template>
  <TheAuthPage id="page-login" :title="t('login')">
    <TheLoginForm />
    <template #below>
      <p class="text-center text-sm text-gray-500">
        {{ t("noAccount") }}
        <UButton variant="link" :to="localePath('/auth/signup')" :padded="false">
          {{ t("signUpHere") }}
        </UButton>
      </p>
    </template>
  </TheAuthPage>
</template>

<i18n lang="yaml">
en:
  title: Login
  login: Login to your account
  noAccount: Don't have an account?
  signUpHere: Sign up here
fr:
  title: Connexion
  login: Connectez-vous à votre compte
  noAccount: Vous n'avez pas de compte?
  signUpHere: Inscrivez-vous ici
</i18n>
