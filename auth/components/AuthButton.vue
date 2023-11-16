<script setup lang="ts">
const { isAuthenticated } = useAuth();
const { t } = useI18n();
const localePath = useLocalePath();

const buttonAttrs = computed(() => ({
  color: <any>"gray",
  variant: <any>"link",
  padded: false,
  to: isAuthenticated.value ? localePath("/auth/logout") : localePath("/auth/login"),
  label: isAuthenticated.value ? t("auth.logout") : t("auth.login"),
}));
</script>

<template>
  <UButton v-bind="buttonAttrs" />
</template>
