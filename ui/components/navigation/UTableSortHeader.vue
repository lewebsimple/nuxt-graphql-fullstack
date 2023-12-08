<script setup lang="ts" generic="Sort extends { by: string; order: SortOrder }">
import { SortOrder } from "~/graphql/utils/graphql";

const props = defineProps<{ modelValue: Sort; label: string; sortBy: string }>();
const emit = defineEmits<{ (event: "update:modelValue", value: Sort): void }>();

const order = computed<SortOrder | null>(() => (props.modelValue.by === props.sortBy ? props.modelValue.order : null));

const icon = computed(() => {
  switch (order.value) {
    case SortOrder.Asc:
      return "i-heroicons-bars-arrow-down";
    case SortOrder.Desc:
      return "i-heroicons-bars-arrow-up";
    default:
      return "i-heroicons-chevron-up-down";
  }
});

const onClick = () => emit("update:modelValue", <Sort>{ by: props.sortBy, order: order.value === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc });
</script>

<template>
  <UButton color="gray" variant="ghost" :label="label" :trailing-icon="icon" @click="onClick" />
</template>
