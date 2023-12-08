export async function useAuthUsers() {
  graphql(`
    query AuthUsers($filters: AuthUserFiltersMany!, $sort: AuthUserSort!) {
      authUserFindMany(filters: $filters, sort: $sort) {
        edges {
          node {
            id
          }
        }
        totalCount
        pageInfo {
          ...PageInfo
        }
      }
    }
  `);
  return {};
}
