<script setup lang="ts">
const { setLocale, locales, locale } = useI18n();
const availableLocales = computed<{ code: string; name: string }[]>(() => {
  return (locales.value as { code: string; name: string }[]).filter(({ code }) => code !== locale.value);
});
</script>

<template>
  <template v-for="{ code, name } in availableLocales" :key="code">
    <UButton v-if="code !== locale" variant="link" color="gray" @click="setLocale(code)">
      {{ name }}
    </UButton>
  </template>
</template>
