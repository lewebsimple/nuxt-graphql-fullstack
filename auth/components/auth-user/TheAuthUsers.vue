<script setup lang="ts">
const { filters, sort, pageInfo, firstPage, previousPage, nextPage, totalCount, fetching, refetch, authUsers } = await useAuthUsers();

const selected = ref<TheAuthUserFragment[]>([]);

function onRefetch() {
  selected.value = [];
  refetch();
}

watch([filters, sort], onRefetch, { deep: true });
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-center gap-4">
      <h1 class="h1">Utilisateurs</h1>
      <TheAuthUsersCreate @refetch="onRefetch" />
      <TheAuthUsersActions v-if="selected.length > 0" :selected="selected" @refetch="onRefetch" />
      <div class="ml-auto text-right">
        <UCursorPagination :page-info="pageInfo" @first-page="firstPage" @next-page="nextPage" @previous-page="previousPage" />
        <UTotalCount :total-count="totalCount" singular="utilisateur" plural="utilisateurs" />
      </div>
    </div>
    <TheAuthUsersFilters v-model="filters" />
    <TheAuthUsersTable v-model:selected="selected" v-model:sort="sort" :rows="authUsers" :loading="fetching" @refetch="onRefetch" />
  </div>
</template>
