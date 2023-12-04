<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

const { login } = useAuth();

const refFormAuthLogin = ref();
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
    useToaster().error("Veuillez vérifier vos identifiants");
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UForm form="refFormAuthLogin" :schema="authLoginSchema" :state="state" @submit="onSubmit">
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
