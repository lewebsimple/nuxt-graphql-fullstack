<script setup lang="ts">
import { AuthRole } from "@prisma/client";

import type { FormSubmitEvent } from "#ui/types";

// Form state
const refForm = ref();
const state = ref<AuthSignup>({ email: "", password: "", role: AuthRole.VERIFIED });

// Form submission
const isSubmitting = ref(false);
const isDisabled = computed(() => isSubmitting.value || refForm.value?.errors.length > 0);
const { signup } = useAuth();
async function onSubmit(event: FormSubmitEvent<AuthSignup>) {
  try {
    isSubmitting.value = true;
    await signup(event.data);
    state.value = { email: "", password: "", role: "VERIFIED" };
    useToaster().success(`Le compte ${event.data.email} a été créé avec succès`);
  } catch (error) {
    useToaster().error("Le courriel est déjà utilisé ou une erreur est survenue");
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
      <UFormGroup name="role" label="Rôle">
        <UAuthRoleInput v-model="state.role" />
      </UFormGroup>
      <UFormGroup name="submit">
        <UButton type="submit" block :disabled="isDisabled" :loading="isSubmitting" :label="isSubmitting ? 'Inscription en cours...' : 'Inscription'" />
      </UFormGroup>
    </div>
  </UForm>
</template>
