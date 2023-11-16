<script setup lang="ts">
const { t } = useI18n();
useHead({ title: t("home") });
</script>

<template>
  <div id="page-home">
    <h1 class="h1">{{ $t("home") }}</h1>
  </div>
</template>
