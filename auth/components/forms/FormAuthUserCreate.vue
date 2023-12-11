<script setup lang="ts">
const { authUserCreate } = useAuthUserMutations();
const defaultState = ref<AuthUserFields>({ email: "", password: "", role: AuthRole.Verified });
async function onAuthUserCreateSubmit(data: AuthUserFields) {
  try {
    await authUserCreate({ data });
    return `L'utilisateur ${data.email} a été créé avec succès`;
  } catch (error) {
    switch ((<Error>error).message) {
      case "AUTH_INVALID_EMAIL":
        throw new Error("Le courriel est invalide.");
      case "AUTH_INVALID_PASSWORD":
        throw new Error("Le mot de passe est invalide.");
      case "AUTH_INVALID_ROLE":
        throw new Error("Le rôle est invalide.");
      default:
        throw new Error("La création a échoué.");
    }
  }
}
</script>

<template>
  <UFormWrapper :schema="authUserFieldsSchema" :default-state="defaultState" :submit-handler="onAuthUserCreateSubmit">
    <template #default="context">
      <FormAuthUserFields v-model="context.state" />
    </template>
  </UFormWrapper>
</template>
