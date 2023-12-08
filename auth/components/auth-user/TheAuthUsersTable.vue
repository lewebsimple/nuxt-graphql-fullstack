<script setup lang="ts">
const props = defineProps<{
  authUsers: TheAuthUserFragment[];
  sort: AuthUserSort;
}>();
const emit = defineEmits<{
  (event: "update:sort", value: AuthUserSort): void;
}>();

const proxySort = computed({ get: () => props.sort, set: (value) => emit("update:sort", value) });

const columns = [
  { key: "email", label: "Courriel" },
  { key: "role", label: "Rôle" },
];
</script>

<template>
  <UTable :columns="columns" :rows="authUsers">
    <template #email-header="{ column }">
      <UTableSortHeader v-model="proxySort" :label="column.label" sort-by="email" />
    </template>
    <template #role-header="{ column }">
      <UTableSortHeader v-model="proxySort" :label="column.label" sort-by="role" />
    </template>
  </UTable>
</template>
