<script setup lang="ts">
const isRedirecting = ref(false);

async function onLogout() {
  const { logout } = useAuth();
  try {
    await logout();
  } catch (error) {
    // Ignore logout errors
  } finally {
    isRedirecting.value = true;
    await useRouter().replace("/");
  }
}
</script>

<template>
  <UButton v-if="isRedirecting" color="gray" variant="ghost" block loading disabled>
    {{ $t("auth.redirecting") }}
  </UButton>
  <UButton v-else block @click="onLogout">
    {{ $t("auth.logout") }}
  </UButton>
</template>
