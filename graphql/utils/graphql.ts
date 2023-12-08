/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
  Upload: { input: File; output: File; }
};

export enum AuthRole {
  Administrator = 'ADMINISTRATOR',
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED'
}

export type AuthRoleFilter = {
  equals?: InputMaybe<AuthRole>;
  in?: InputMaybe<Array<AuthRole>>;
  notIn?: InputMaybe<Array<AuthRole>>;
};

export type AuthUser = Node & {
  __typename?: 'AuthUser';
  email: Scalars['String']['output'];
  globalId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  role: AuthRole;
};

export type AuthUserFilter = {
  role?: InputMaybe<AuthRoleFilter>;
};

export type AuthUserOrderBy = {
  email?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
};

export type AuthUserUniqueFilter = {
  email: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ping: Scalars['String']['output'];
};

export type Node = {
  globalId: Scalars['ID']['output'];
};

export enum OrderBy {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  authUsers: QueryAuthUsersConnection;
  /** Current application version */
  version: Scalars['String']['output'];
};


export type QueryAuthUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy: AuthUserOrderBy;
  where: AuthUserFilter;
};

export type QueryAuthUsersConnection = {
  __typename?: 'QueryAuthUsersConnection';
  edges: Array<Maybe<QueryAuthUsersConnectionEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type QueryAuthUsersConnectionEdge = {
  __typename?: 'QueryAuthUsersConnectionEdge';
  cursor: Scalars['String']['output'];
  node: AuthUser;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = { __typename?: 'Query', version: string };

export type PingMutationVariables = Exact<{ [key: string]: never; }>;


export type PingMutation = { __typename?: 'Mutation', ping: string };

export type PageInfoFragment = { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null };

export const PageInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<PageInfoFragment, unknown>;
export const VersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<VersionQuery, VersionQueryVariables>;
export const PingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Ping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ping"}}]}}]} as unknown as DocumentNode<PingMutation, PingMutationVariables>;