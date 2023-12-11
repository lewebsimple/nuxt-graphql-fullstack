<script setup lang="ts">
const props = defineProps<{ authUsers: TheAuthUserFragment[] }>();
const { authUserDestroyMany } = useAuthUserMutations();
</script>

<template>
  <FormEntityDestroy :entities="authUsers" :destroy="authUserDestroyMany">
    <template #default="{ entities }: { entities: TheAuthUserFragment[] }">
      <ul class="list-disc list-inside">
        <li v-for="entity in entities" :key="entity.id">
          <span>{{ entity.email }}</span>
        </li>
      </ul>
    </template>
  </FormEntityDestroy>
</template>
