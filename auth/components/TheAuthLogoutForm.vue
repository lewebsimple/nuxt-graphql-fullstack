<script setup lang="ts">
const { logout } = useAuth();
const { t } = useI18n();
const state = ref({});

const isSubmitting = ref(false);
const submitAttrs = computed(() => ({
  block: true,
  color: <any>(isSubmitting.value ? "gray" : "primary"),
  disabled: isSubmitting.value,
  label: isSubmitting.value ? t("auth.logging_out") : t("auth.logout"),
  loading: isSubmitting.value,
  type: "submit",
  variant: <any>(isSubmitting.value ? "ghost" : "solid"),
}));

async function onSubmit() {
  try {
    isSubmitting.value = true;
    await logout();
    await useRouter().replace("/");
  } catch (error) {
    useToast().add({
      title: t("error"),
      description: t("auth.logout_failed_description"),
      icon: "i-heroicons-x-circle",
      color: "red",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UForm :state="state" @submit="onSubmit">
    <UFormGroup name="submit">
      <UButton v-bind="submitAttrs" />
    </UFormGroup>
  </UForm>
</template>
