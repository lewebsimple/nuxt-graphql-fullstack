import { useMutation, useQuery } from "@urql/vue";
import { z } from "zod";

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

// AuthUser fields schema
export const authUserFieldsSchema = z.object({
  email: z.string().email("Courriel invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  role: z.nativeEnum(AuthRole),
});
export type AuthUserFields = z.infer<typeof authUserFieldsSchema>;

export function useAuthUserMutations() {
  // Create AuthUser
  const { executeMutation: authUserCreate } = useMutation(
    graphql(`
      mutation AuthUserCreate($data: AuthUserCreateInput!) {
        authUserCreate(data: $data) {
          ...TheAuthUser
        }
      }
    `),
  );

  // Destroy many AuthUsers
  const { executeMutation: authUserDestroyMany } = useMutation(
    graphql(`
      mutation AuthUserDestroyMany($ids: [String!]!) {
        authUserDestroyMany(authUserIds: $ids)
      }
    `),
  );
  return { authUserCreate, authUserDestroyMany };
}
