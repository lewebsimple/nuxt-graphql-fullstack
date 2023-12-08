import { useMutation, useQuery } from "@urql/vue";

graphql(`
  query TheVersion {
    version
  }
`);
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

export function usePing() {
  const { executeMutation: ping } = useMutation<PingMutation, PingMutationVariables>(
    graphql(`
      mutation Ping {
        ping
      }
    `),
  );
  return { ping };
}
