<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

const { t } = useI18n();
const { login } = useAuth();

const refAuthLoginForm = ref();
const state = ref<AuthLogin>({ email: "", password: "" });

const isSubmitting = ref(false);
const submitAttrs = computed(() => ({
  block: true,
  color: <any>isSubmitting.value ? "gray" : "primary",
  disabled: isSubmitting.value || refAuthLoginForm.value?.errors.length > 0,
  label: isSubmitting.value ? t("auth.logging_in") : t("auth.login"),
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
      title: t("error"),
      description: t("auth.login_failed_description"),
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
      <UFormGroup name="email" :label="$t('email')">
        <UInput v-model="state.email" type="email" />
      </UFormGroup>
      <UFormGroup name="password" :label="$t('password')">
        <UPasswordInput v-model="state.password" />
      </UFormGroup>
      <UFormGroup name="submit">
        <UButton v-bind="submitAttrs" />
      </UFormGroup>
    </div>
  </UForm>
</template>
