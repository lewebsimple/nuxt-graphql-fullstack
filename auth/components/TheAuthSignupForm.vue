<script setup lang="ts">
import { AuthRole } from "@prisma/client";

import type { FormSubmitEvent } from "#ui/types";

const { signup } = useAuth();
const { t } = useI18n();

const state = ref<AuthSignup>({ email: "", password: "", role: AuthRole.VERIFIED });

const roleOptions = [
  { value: AuthRole.VERIFIED, label: t("auth.role_verified") },
  { value: AuthRole.ADMINISTRATOR, label: t("auth.role_administrator") },
];

const isSubmitting = ref(false);
const submitAttrs = computed(() => ({
  block: true,
  color: <any>isSubmitting.value ? "gray" : "primary",
  disabled: isSubmitting.value,
  label: isSubmitting.value ? t("auth.signing_up") : t("auth.signup"),
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
      title: t("success"),
      description: t("auth.signup_success_description", { email: event.data.email }),
      icon: "i-heroicons-check-circle",
      color: "green",
    });
  } catch (error) {
    useToast().add({
      title: t("error"),
      description: t("auth.signup_failed_description"),
      icon: "i-heroicons-x-circle",
      color: "red",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UForm :schema="authLoginSchema" :state="state" @submit="onSubmit">
    <div class="form-wrapper">
      <UFormGroup name="email" :label="$t('email')">
        <UInput v-model="state.email" type="email" />
      </UFormGroup>
      <UFormGroup name="password" :label="$t('password')">
        <UPasswordInput v-model="state.password" />
      </UFormGroup>
      <UFormGroup name="role" :label="$t('role')">
        <USelect v-model="state.role" :options="roleOptions" />
      </UFormGroup>
      <UFormGroup name="submit">
        <UButton v-bind="submitAttrs" />
      </UFormGroup>
    </div>
  </UForm>
</template>
