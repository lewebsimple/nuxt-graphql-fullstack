<script setup lang="ts">
const props = defineProps<{ rows: TheAuthUserFragment[]; sort: AuthUserSort; selected: TheAuthUserFragment[] }>();
const emit = defineEmits<{
  (event: "update:selected", value: TheAuthUserFragment[]): void;
  (event: "update:sort", value: AuthUserSort): void;
  (event: "refetch"): void;
}>();

const proxySort = computed({ get: () => props.sort, set: (value) => emit("update:sort", value) });

const proxySelected = computed({ get: () => props.selected, set: (value) => emit("update:selected", value) });
function onSelect(row: TheAuthUserFragment) {
  const index = props.selected.findIndex((item) => item.id === row.id);
  index === -1 ? proxySelected.value.push(row) : proxySelected.value.splice(index, 1);
}

const columns = [{ key: "email", label: "Courriel", class: "w-full" }, { key: "role", label: "Rôle" }, { key: "actions" }];
</script>

<template>
  <UTable v-model="proxySelected" :columns="columns" :rows="rows" @select="onSelect">
    <template #email-header="{ column }">
      <UTableSortHeader v-model="proxySort" :label="column.label" sort-by="email" />
    </template>
    <template #role-header="{ column }">
      <UTableSortHeader v-model="proxySort" :label="column.label" sort-by="role" />
    </template>
    <template #role-data="{ row }: { row: TheAuthUserFragment }">
      {{ authRoleLabel(row.role) }}
    </template>
    <template #actions-data="{ row }: { row: TheAuthUserFragment }">
      <TheAuthUsersActions :selected="[row]" @refetch="$emit('refetch')">
        <UButton variant="ghost" trailing-icon="i-heroicons-ellipsis-vertical" />
      </TheAuthUsersActions>
    </template>
  </UTable>
</template>
