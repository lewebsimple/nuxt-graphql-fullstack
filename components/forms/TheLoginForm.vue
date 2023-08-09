<script setup lang="ts">
import { useForm } from "@vorms/core";
import { zodResolver } from "@vorms/resolvers/zod";
import { z } from "zod";

const { t: $t } = useI18n();

const isRedirecting = ref(false);

const { register, errors, handleSubmit, isSubmitting } = useForm({
  initialValues: { email: "", password: "" },
  validate: zodResolver(
    z.object({
      email: z.string().min(1, $t("auth.emailRequired")).email($t("auth.emailInvalid")),
      password: z.string().min(1, $t("auth.passwordRequired")),
    }),
  ),
  onSubmit: async (credentials) => {
    const { login } = useAuth();
    try {
      await login(credentials);
      const redirect = (useRoute().query.redirect as string) || "/";
      isRedirecting.value = true;
      await useRouter().replace(redirect);
    } catch (error) {
      errors.value.email = $t("auth.loginFailed");
    }
  },
});

const { value: emailValue, attrs: emailAttrs } = register("email");
const { value: passwordValue, attrs: passwordAttrs } = register("password");

const passwordReveal = ref(false);
</script>

<template>
  <form @submit="handleSubmit">
    <UFormGroup name="email" :label="$t('auth.email')" :error="errors?.email">
      <UInput v-model="emailValue" v-bind="emailAttrs" type="email" icon="i-heroicons-envelope" />
    </UFormGroup>
    <UFormGroup name="password" :label="$t('auth.password')" :error="errors?.password">
      <UInput
        v-model="passwordValue"
        v-bind="passwordAttrs"
        icon="i-heroicons-key"
        :type="passwordReveal ? 'text' : 'password'"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            color="gray"
            variant="ghost"
            :icon="passwordReveal ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
            :padded="false"
            @click="passwordReveal = !passwordReveal"
          />
        </template>
      </UInput>
    </UFormGroup>
    <UButton v-if="isRedirecting" block color="gray" variant="ghost" loading disabled>
      {{ $t("auth.redirecting") }}
    </UButton>
    <UButton v-else block type="submit" :loading="isSubmitting">
      {{ $t("auth.login") }}
    </UButton>
  </form>
</template>
