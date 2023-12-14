/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      query Version {\n        version\n      }\n    ": types.VersionDocument,
    "\n      mutation Ping {\n        ping\n      }\n    ": types.PingDocument,
    "\n  fragment TheAuthUser on AuthUser {\n    id\n    email\n    role\n  }\n": types.TheAuthUserFragmentDoc,
    "\n      query TheAuthUsers($filters: AuthUserFiltersMany!, $sort: AuthUserSort!, $after: String, $before: String, $first: Int, $last: Int) {\n        authUserFindMany(filters: $filters, sort: $sort, after: $after, before: $before, first: $first, last: $last) {\n          edges {\n            node {\n              ...TheAuthUser\n            }\n          }\n          totalCount\n          pageInfo {\n            ...PageInfo\n          }\n        }\n      }\n    ": types.TheAuthUsersDocument,
    "\n      mutation AuthUserCreate($data: AuthUserCreateInput!) {\n        authUserCreate(data: $data) {\n          ...TheAuthUser\n        }\n      }\n    ": types.AuthUserCreateDocument,
    "\n      mutation AuthUserDestroyMany($authUserIds: [String!]!) {\n        authUserDestroyMany(authUserIds: $authUserIds)\n      }\n    ": types.AuthUserDestroyManyDocument,
    "\n  fragment PageInfo on PageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n": types.PageInfoFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Version {\n        version\n      }\n    "): (typeof documents)["\n      query Version {\n        version\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation Ping {\n        ping\n      }\n    "): (typeof documents)["\n      mutation Ping {\n        ping\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TheAuthUser on AuthUser {\n    id\n    email\n    role\n  }\n"): (typeof documents)["\n  fragment TheAuthUser on AuthUser {\n    id\n    email\n    role\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query TheAuthUsers($filters: AuthUserFiltersMany!, $sort: AuthUserSort!, $after: String, $before: String, $first: Int, $last: Int) {\n        authUserFindMany(filters: $filters, sort: $sort, after: $after, before: $before, first: $first, last: $last) {\n          edges {\n            node {\n              ...TheAuthUser\n            }\n          }\n          totalCount\n          pageInfo {\n            ...PageInfo\n          }\n        }\n      }\n    "): (typeof documents)["\n      query TheAuthUsers($filters: AuthUserFiltersMany!, $sort: AuthUserSort!, $after: String, $before: String, $first: Int, $last: Int) {\n        authUserFindMany(filters: $filters, sort: $sort, after: $after, before: $before, first: $first, last: $last) {\n          edges {\n            node {\n              ...TheAuthUser\n            }\n          }\n          totalCount\n          pageInfo {\n            ...PageInfo\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation AuthUserCreate($data: AuthUserCreateInput!) {\n        authUserCreate(data: $data) {\n          ...TheAuthUser\n        }\n      }\n    "): (typeof documents)["\n      mutation AuthUserCreate($data: AuthUserCreateInput!) {\n        authUserCreate(data: $data) {\n          ...TheAuthUser\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation AuthUserDestroyMany($authUserIds: [String!]!) {\n        authUserDestroyMany(authUserIds: $authUserIds)\n      }\n    "): (typeof documents)["\n      mutation AuthUserDestroyMany($authUserIds: [String!]!) {\n        authUserDestroyMany(authUserIds: $authUserIds)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageInfo on PageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n"): (typeof documents)["\n  fragment PageInfo on PageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;