<script setup lang="ts">
import { AuthRole } from "@prisma/client";

import type { FormSubmitEvent } from "#ui/types";

const { signup } = useAuth();

const refFormAuthSignup = ref();

const state = ref<AuthSignup>({ email: "", password: "", role: AuthRole.VERIFIED });

const roleOptions = [
  { value: AuthRole.VERIFIED, label: "Utilisateur" },
  { value: AuthRole.ADMINISTRATOR, label: "Administrateur" },
];

const isSubmitting = ref(false);
const submitAttrs = computed(() => ({
  block: true,
  color: <any>isSubmitting.value ? "gray" : "primary",
  disabled: isSubmitting.value || refFormAuthSignup.value?.errors.length > 0,
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
    useToaster().success(`Le compte ${event.data.email} a été créé avec succès`);
  } catch (error) {
    useToaster().error("Le courriel est déjà utilisé ou une erreur est survenue");
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UForm form="refAuthSignup" :schema="authLoginSchema" :state="state" @submit="onSubmit">
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
