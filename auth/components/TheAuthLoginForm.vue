<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

const { login } = useAuth();

const refAuthLoginForm = ref();
const state = ref<AuthLogin>({ email: "", password: "" });

const isSubmitting = ref(false);
const submitAttrs = computed(() => ({
  block: true,
  color: <any>isSubmitting.value ? "gray" : "primary",
  disabled: isSubmitting.value,
  label: isSubmitting.value ? "Connexion en cours..." : "Connexion",
  loading: isSubmitting.value,
  type: "submit",
  variant: <any>"solid",
}));

async function onSubmit(event: FormSubmitEvent<AuthLogin>) {
  try {
    isSubmitting.value = true;
    await login(event.data);
    const redirect = useRoute().query.redirect?.toString() || "/";
    await useRouter().replace(redirect);
  } catch (error) {
    useToast().add({
      title: "Échec de la connexion",
      description: "Veuillez vérifier vos identifiants",
      icon: "i-heroicons-x-circle",
      color: "red",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UForm ref="refAuthLoginForm" :schema="authLoginSchema" :state="state" @submit="onSubmit">
    <div class="form-wrapper">
      <UFormGroup name="email" label="Courriel">
        <UInput v-model="state.email" type="email" />
      </UFormGroup>
      <UFormGroup name="password" label="Mot de passe">
        <UPasswordInput v-model="state.password" />
      </UFormGroup>
      <UFormGroup name="submit">
        <UButton v-bind="submitAttrs" />
      </UFormGroup>
    </div>
  </UForm>
</template>
