<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

// Form state
const refForm = ref();
const state = ref<AuthLogin>({ email: "", password: "" });

// Form submission
const { login } = useAuth();
const isSubmitting = ref(false);
const isDisabled = computed(() => isSubmitting.value || refForm.value?.errors.length > 0);
async function onSubmit(event: FormSubmitEvent<AuthLogin>) {
  try {
    isSubmitting.value = true;
    await login(event.data);
    const redirect = useRoute().query.redirect?.toString() || "/";
    await useRouter().replace(redirect);
  } catch (error) {
    useToaster().error("Veuillez vérifier vos identifiants");
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UForm form="refForm" :schema="authLoginSchema" :state="state" @submit="onSubmit">
    <div class="form-wrapper">
      <UFormGroup name="email" label="Courriel">
        <UInput v-model="state.email" type="email" />
      </UFormGroup>
      <UFormGroup name="password" label="Mot de passe">
        <UPasswordInput v-model="state.password" />
      </UFormGroup>
      <UFormGroup name="submit">
        <UButton type="submit" block :disabled="isDisabled" :loading="isSubmitting" :label="isSubmitting ? 'Connexion en cours...' : 'Connexion'" />
      </UFormGroup>
    </div>
  </UForm>
</template>
