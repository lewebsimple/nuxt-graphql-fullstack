import { useQuery } from "@urql/vue";

import { graphql } from "~/generated/graphql";
import type { VersionQuery } from "~/generated/graphql/graphql";

export async function useVersion() {
  const { data, error } = await useQuery<VersionQuery>({
    query: graphql(`
      query Version {
        version
      }
    `),
  });
  if (error.value) throw createError({ statusCode: 500, message: error.value.message });
  if (!data.value) throw createError({ statusCode: 500, message: "Version inconnue" });
  return { version: data.value.version };
}
