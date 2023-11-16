<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed(() => (locales.value as { code: string; name: string }[]).filter(({ code }) => code !== locale.value));
</script>

<template>
  <div class="flex items-center gap-2">
    <UButton v-for="{ code, name } in availableLocales" :key="code" color="gray" variant="link" :to="switchLocalePath(code)">
      {{ name }}
    </UButton>
  </div>
</template>
