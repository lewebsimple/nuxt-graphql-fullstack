<script setup lang="ts">
const { filters, sort, pageInfo, firstPage, previousPage, nextPage, totalCount, fetching, refetch, authUsers } = await useAuthUsers();
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-4">
      <h1 class="h1">Utilisateurs</h1>
      <UButton variant="soft" label="Ajouter" icon="i-heroicons-plus" to="/auth/signup" />
      <div class="relative ml-auto">
        <UCursorPagination :page-info="pageInfo" @first-page="firstPage" @next-page="nextPage" @previous-page="previousPage" />
        <UTotalCount class="absolute top-full right-0" :total-count="totalCount" singular="utilisateur" plural="utilisateurs" />
      </div>
    </div>
    <TheAuthUsersFilters v-model="filters" />
    <TheAuthUsersTable :auth-users="authUsers" />
  </div>
</template>
