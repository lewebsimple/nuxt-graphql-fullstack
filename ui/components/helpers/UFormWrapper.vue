<script setup lang="ts" generic="FormState extends Record<string, any> | {}">
import { type ZodType, type ZodTypeDef } from "zod";

import type { FormSubmitEvent } from "#ui/types";

const props = withDefaults(
  defineProps<{
    submitHandler: (data: FormState) => Promise<string | void>;
    schema?: ZodType<any, ZodTypeDef, any>;
    defaultState?: FormState;
    submitLabel?: string;
    submitColor?: string;
  }>(),
  {
    schema: undefined,
    defaultState: undefined,
    submitLabel: "Sauvegarder",
    submitColor: "primary",
  },
);
const emit = defineEmits<{ (event: "cancel"): void; (event: "success"): void }>();

// Form state
const refForm = ref();
const state = ref<FormState>({ ...(props.defaultState || ({} as unknown as FormState)) });

// Form submission
const isSubmitting = ref(false);
const isDisabled = computed(() => isSubmitting.value || refForm.value?.errors.length > 0);
async function onSubmit(event: FormSubmitEvent<FormState>) {
  try {
    isSubmitting.value = true;
    const message = await props.submitHandler(event.data);
    useToaster().success(message || "Formulaire soumis avec succès");
    emit("success");
  } catch (error) {
    // TODO: Handle field-specific server-side validation errors
    useToaster().error(error instanceof Error ? error.message : "Une erreur est survenue");
  } finally {
    isSubmitting.value = false;
  }
}

function onCancel() {
  props.defaultState && Object.assign(state.value, props.defaultState);
  emit("cancel");
}
</script>

<template>
  <UForm ref="refForm" :schema="schema" :state="state" @submit="onSubmit">
    <div class="form-wrapper">
      <slot :state="state" />
      <div class="flex justify-end items-center gap-4">
        <UButton color="white" variant="outline" label="Annuler" @click="onCancel" />
        <UButton
          type="submit"
          :color="isSubmitting ? 'gray' : submitColor"
          :disabled="isDisabled"
          :loading="isSubmitting"
          :label="isSubmitting ? 'Veuillez patienter...' : submitLabel || 'Sauvegarder'"
        />
      </div>
    </div>
  </UForm>
</template>
