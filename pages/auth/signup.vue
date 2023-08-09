<script setup lang="ts">
definePageMeta({ layout: "blank", middleware: "not-authenticated" });
defineI18nRoute({ paths: { fr: "/auth/inscription" } });
const { t } = useI18n({ useScope: "local" });
const localePath = useLocalePath();
useHead({ title: t("title") });
</script>

<template>
  <TheAuthPage id="page-signup" :title="t('signup')">
    <TheSignupForm />
    <template #below>
      <p class="text-center text-sm text-gray-500">
        {{ t("alreadyHaveAccount") }}
        <UButton variant="link" :to="localePath('/auth/login')" :padded="false">
          {{ t("loginHere") }}
        </UButton>
      </p>
    </template>
  </TheAuthPage>
</template>

<i18n lang="yaml">
en:
  title: Sign up
  signup: Create an account
  alreadyHaveAccount: Already have an account?
  loginHere: Login here
fr:
  title: Inscription
  signup: Créer un compte
  alreadyHaveAccount: Vous avez déjà un compte?
  loginHere: Connectez-vous ici
</i18n>
