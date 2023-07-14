<script setup lang="ts">
import { useForm } from "@vorms/core";
import { zodResolver } from "@vorms/resolvers/zod";
import { z } from "zod";

const isRedirecting = ref(false);

const { register, errors, handleSubmit, isSubmitting } = useForm({
  initialValues: { email: "", password: "" },
  validate: zodResolver(
    z.object({
      email: z.string().min(1, "Email is required").email("Email is invalid"),
      password: z.string().min(1, "Password is required"),
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
      errors.value.email = "Login failed";
    }
  },
});

const { value: emailValue, attrs: emailAttrs } = register("email");
const { value: passwordValue, attrs: passwordAttrs } = register("password");

const passwordReveal = ref(false);
</script>

<template>
  <form @submit="handleSubmit">
    <UFormGroup name="email" label="Email" :error="errors?.email">
      <UInput v-model="emailValue" v-bind="emailAttrs" type="email" icon="i-heroicons-envelope" />
    </UFormGroup>
    <UFormGroup name="password" label="Password" :error="errors?.password">
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
    <UButton v-if="isRedirecting" block color="gray" variant="ghost" loading disabled>Redirecting...</UButton>
    <UButton v-else block type="submit" :loading="isSubmitting">Login</UButton>
  </form>
</template>
