<script setup lang="ts">
const { login } = useAuth();
async function onLoginSubmit(data: AuthLogin) {
  try {
    await login(data);
    return "Connexion réussie";
  } catch (error) {
    switch ((<Error>error).message) {
      case "AUTH_INVALID_KEY_ID":
        throw new Error("Le courriel est invalide.");
      case "AUTH_INVALID_PASSWORD":
        throw new Error("Le mot de passe est invalide.");
      default:
        throw new Error("La connexion a échoué.");
    }
  }
}
</script>

<template>
  <UFormWrapper :schema="authLoginSchema" :submit-handler="onLoginSubmit" submit-label="Connexion" @success="$router.push('/')">
    <template #default="{ state }">
      <UFormGroup name="email" label="Courriel">
        <UInput v-model="state.email" type="email" />
      </UFormGroup>
      <UFormGroup name="password" label="Mot de passe">
        <UPasswordInput v-model="state.password" />
      </UFormGroup>
    </template>
  </UFormWrapper>
</template>
