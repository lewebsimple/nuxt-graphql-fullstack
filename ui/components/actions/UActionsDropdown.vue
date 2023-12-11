<script setup lang="ts">
type RowAction = { label: string; title: string; icon: string; to?: string | undefined };
const props = defineProps<{ actions: Record<string, RowAction> }>();
const emit = defineEmits<{ (event: "refetch"): void }>();

const items = computed(() => [
  Object.entries(props.actions).map(([key, action]) => ({
    label: action.label,
    icon: action.icon,
    click: () => {
      if (action.to) {
        useRouter().push(action.to);
      } else {
        currentAction.value = key;
      }
    },
  })),
]);

const currentAction = ref<string | null>(null);
const isShowing = (action: string) => currentAction.value === action;
const onClose = () => (currentAction.value = null);
const onSuccess = () => {
  onClose();
  emit("refetch");
};
</script>

<template>
  <UDropdown :items="items" @click.stop>
    <slot>
      <UButton color="white" variant="outline" trailing-icon="i-heroicons-chevron-down" label="Actions" />
    </slot>
  </UDropdown>
  <template v-for="(action, key) in actions" :key="key">
    <UActionModal v-if="isShowing(key)" :title="action.title" @close="onClose">
      <slot :name="`${key}-action`" :on-close="onClose" :on-success="onSuccess" />
    </UActionModal>
  </template>
</template>
