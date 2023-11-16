<script setup lang="ts">
const { logout } = useAuth();

const state = ref({});

const isSubmitting = ref(false);
const submitAttrs = computed(() => ({
  block: true,
  color: <any>(isSubmitting.value ? "gray" : "primary"),
  disabled: isSubmitting.value,
  label: isSubmitting.value ? "Déconnexion en cours..." : "Déconnexion",
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
    // Ignore logout errors
    useToast().add({
      title: "Échec de la déconnexion",
      description: "Veuillez réessayer plus tard",
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
