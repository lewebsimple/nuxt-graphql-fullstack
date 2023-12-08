export const pageInfoFragment = graphql(`
  fragment PageInfo on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`);

export type CursorPagination = {
  after: string | null;
  before: string | null;
  first: number | null;
  last: number | null;
};

export function useCursorPagination(pageInfo: Ref<PageInfoFragment | null | undefined>, perPage = 10) {
  const cursorPagination = ref<CursorPagination>({ after: null, before: null, first: perPage, last: null });

  function firstPage() {
    Object.assign(cursorPagination.value, { after: null, before: null, first: perPage, last: null });
  }

  function previousPage() {
    if (!pageInfo.value?.hasPreviousPage) return;
    Object.assign(cursorPagination.value, { after: null, before: pageInfo.value.startCursor, first: null, last: perPage });
  }

  function nextPage() {
    if (!pageInfo.value?.hasNextPage) return;
    Object.assign(cursorPagination.value, { after: pageInfo.value.endCursor, before: null, first: perPage, last: null });
  }

  return { cursorPagination, firstPage, previousPage, nextPage };
}
