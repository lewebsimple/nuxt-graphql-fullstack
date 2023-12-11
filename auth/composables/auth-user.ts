import { useMutation, useQuery } from "@urql/vue";

const theAuthUserFragment = graphql(`
  fragment TheAuthUser on AuthUser {
    id
    email
    role
  }
`);

export async function useAuthUsers() {
  const filters = ref<AuthUserFiltersMany>({ search: null, role: null });
  const sort = ref<AuthUserSort>({ by: AuthUserSortBy.Email, order: SortOrder.Asc });
  const pageInfo = computed(() => data.value?.authUserFindMany.pageInfo);
  const { cursorPagination, firstPage, previousPage, nextPage } = useCursorPagination(pageInfo);
  watch([filters, sort], (newInput, oldInput) => JSON.stringify(newInput) !== JSON.stringify(oldInput) && firstPage());
  const { data, fetching, executeQuery } = await useQuery<TheAuthUsersQuery, TheAuthUsersQueryVariables>({
    query: graphql(`
      query TheAuthUsers($filters: AuthUserFiltersMany!, $sort: AuthUserSort!, $after: String, $before: String, $first: Int, $last: Int) {
        authUserFindMany(filters: $filters, sort: $sort, after: $after, before: $before, first: $first, last: $last) {
          edges {
            node {
              ...TheAuthUser
            }
          }
          totalCount
          pageInfo {
            ...PageInfo
          }
        }
      }
    `),
    variables: computed(() => ({ filters: filters.value, sort: sort.value, ...cursorPagination.value })),
  });
  return {
    filters,
    sort,
    pageInfo,
    firstPage,
    previousPage,
    nextPage,
    totalCount: computed(() => data.value?.authUserFindMany.totalCount || 0),
    fetching,
    refetch: () => executeQuery({ requestPolicy: "network-only" }),
    authUsers: computed<TheAuthUserFragment[]>(
      () => data.value?.authUserFindMany.edges?.map((edge) => edge?.node).filter((authUser): authUser is TheAuthUserFragment => !!authUser) || [],
    ),
  };
}

export function useAuthUserMutations() {
  // Destroy many AuthUsers
  const { executeMutation: authUserDestroyMany } = useMutation(
    graphql(`
      mutation AuthUserDestroyMany($ids: [String!]!) {
        authUserDestroyMany(authUserIds: $ids)
      }
    `),
  );
  return { authUserDestroyMany };
}
