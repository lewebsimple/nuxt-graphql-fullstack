<script setup lang="ts">
type RowAction = {
  key: string;
  label: string;
  icon: string;
  title?: string;
  click?: () => Promise<void>;
  to?: string | undefined;
};
const props = defineProps<{ actions: RowAction[][] }>();
const emit = defineEmits<{ (event: "refetch"): void }>();

const items = props.actions.map((actionGroup) =>
  actionGroup.map((action) => ({
    label: action.label,
    icon: action.icon,
    click: async () => {
      if (action.click) {
        await action.click();
      } else if (action.to) {
        useRouter().push(action.to);
      } else {
        currentAction.value = action.key;
      }
    },
  })),
);

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
  <template v-for="(actionGroup, i) in actions" :key="i">
    <template v-for="action in actionGroup" :key="action.key">
      <UActionModal v-if="isShowing(action.key)" :title="action.title || action.label" @close="onClose">
        <slot :name="`${action.key}-action`" :on-close="onClose" :on-success="onSuccess" />
      </UActionModal>
    </template>
  </template>
</template>
