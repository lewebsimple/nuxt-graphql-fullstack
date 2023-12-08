<script setup lang="ts" generic="T">
type BulkAction = {
  label: string;
  title: string;
  icon: string;
};
const props = defineProps<{
  selected: T[];
  actions: Record<string, BulkAction>;
}>();
const emit = defineEmits<{ (event: "refetch"): void }>();

const items = computed(() => [
  Object.entries(props.actions).map(([key, action]) => ({
    label: action.label,
    icon: action.icon,
    click: () => (currentAction.value = key),
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
  <UDropdown v-if="selected.length > 0" :items="items">
    <UButton color="white" variant="outline" label="Actions groupées" trailing-icon="i-heroicons-chevron-down" />
  </UDropdown>
  <template v-for="(action, key) in actions" :key="key">
    <UActionModal v-if="isShowing(key)" :title="action.title" @close="onClose">
      <slot :name="`${key}-action`" :on-close="onClose" :on-success="onSuccess" />
    </UActionModal>
  </template>
</template>
