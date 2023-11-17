<script setup lang="ts">
import { AuthRole } from "@prisma/client";

import type { FormSubmitEvent } from "#ui/types";

const { signup } = useAuth();

const refAuthSignupForm = ref();

const state = ref<AuthSignup>({ email: "", password: "", role: AuthRole.VERIFIED });

const roleOptions = [
  { value: AuthRole.VERIFIED, label: "Utilisateur" },
  { value: AuthRole.ADMINISTRATOR, label: "Administrateur" },
];

const isSubmitting = ref(false);
const submitAttrs = computed(() => ({
  block: true,
  color: <any>isSubmitting.value ? "gray" : "primary",
  disabled: isSubmitting.value || refAuthSignupForm.value?.errors.length > 0,
  label: isSubmitting.value ? "Inscription en cours..." : "Inscription",
  loading: isSubmitting.value,
  type: "submit",
  variant: <any>"solid",
}));

async function onSubmit(event: FormSubmitEvent<AuthSignup>) {
  try {
    isSubmitting.value = true;
    await signup(event.data);
    state.value = { email: "", password: "", role: "VERIFIED" };
    useToast().add({
      title: "Inscription réussie",
      description: `Le compte ${event.data.email} a été créé avec succès`,
      icon: "i-heroicons-check-circle",
      color: "green",
    });
  } catch (error) {
    useToast().add({
      title: "Échec de l'inscription",
      description: "Le courriel est déjà utilisé ou une erreur est survenue",
      icon: "i-heroicons-x-circle",
      color: "red",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UForm ref="refAuthSignupForm" :schema="authLoginSchema" :state="state" @submit="onSubmit">
    <div class="form-wrapper">
      <UFormGroup name="email" label="Courriel">
        <UInput v-model="state.email" type="email" />
      </UFormGroup>
      <UFormGroup name="password" label="Mot de passe">
        <UPasswordInput v-model="state.password" />
      </UFormGroup>
      <UFormGroup name="role" label="Rôle">
        <USelect v-model="state.role" :options="roleOptions" />
      </UFormGroup>
      <UFormGroup name="submit">
        <UButton v-bind="submitAttrs" />
      </UFormGroup>
    </div>
  </UForm>
</template>
