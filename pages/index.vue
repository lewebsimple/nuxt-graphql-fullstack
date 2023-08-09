<script setup lang="ts">
const { t } = useI18n({ useScope: "local" });
useHead({ title: t("title") });
</script>

<template>
  <div id="page-home" class="container">
    <h1>{{ t("title") }}</h1>
  </div>
</template>

<i18n lang="yaml">
en:
  title: "Home"
fr:
  title: "Accueil"
</i18n>
