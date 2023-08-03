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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export enum AuthRole {
  Administrator = 'ADMINISTRATOR',
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED'
}

export type AuthRoleFilter = {
  equals: InputMaybe<AuthRole>;
  in: InputMaybe<Array<AuthRole>>;
  not: InputMaybe<AuthRoleFilter>;
  notIn: InputMaybe<Array<AuthRole>>;
};

export type AuthUser = Node & {
  __typename?: 'AuthUser';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role: AuthRole;
};

export type AuthUserFilter = {
  email: InputMaybe<StringFilter>;
  role: InputMaybe<AuthRoleFilter>;
};

export type AuthUserOrderBy = {
  email: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Dummy mutation */
  ping: Scalars['String']['output'];
};

export type Node = {
  id: Scalars['ID']['output'];
};

export enum OrderBy {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Maybe<Scalars['ID']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Maybe<Scalars['ID']['output']>;
};

export type Query = {
  __typename?: 'Query';
  authUsers: QueryAuthUsersConnection;
  node: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  /** Current application version */
  version: Scalars['String']['output'];
};


export type QueryAuthUsersArgs = {
  after: InputMaybe<Scalars['ID']['input']>;
  before: InputMaybe<Scalars['ID']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AuthUserOrderBy>;
  where: InputMaybe<AuthUserFilter>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryAuthUsersConnection = {
  __typename?: 'QueryAuthUsersConnection';
  edges: Array<Maybe<QueryAuthUsersConnectionEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type QueryAuthUsersConnectionEdge = {
  __typename?: 'QueryAuthUsersConnectionEdge';
  cursor: Scalars['ID']['output'];
  node: AuthUser;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  contains: InputMaybe<Scalars['String']['input']>;
  equals: InputMaybe<Scalars['String']['input']>;
  not: InputMaybe<StringFilter>;
  startsWith: InputMaybe<Scalars['String']['input']>;
};

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = { __typename?: 'Query', version: string };


export const VersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<VersionQuery, VersionQueryVariables>;