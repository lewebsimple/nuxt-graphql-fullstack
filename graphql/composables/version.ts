import { useQuery } from "@urql/vue";

export async function useVersion() {
  const { data, error } = await useQuery<VersionQuery>({
    query: graphql(`
      query Version {
        version
      }
    `),
  });
  if (error.value) {
    throw createError({ statusCode: 500, message: error.value.message });
  }
  return { version: data.value?.version };
}
