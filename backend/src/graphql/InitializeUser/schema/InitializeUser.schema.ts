import { gql } from 'graphql-tag'

export const InitializeUserTypeDefs = gql`
  enum Country {
    GB
    FR
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    name: String!
    clerkId: String!
    country: Country!
  }

  input InitializeUserInput {
    clerkId: String!
    firstName: String!
    lastName: String!
    name: String!
    country: Country!
  }

  type InitializeUserResponse {
    user: User!
    created: Boolean!
    message: String!
  }

  type Mutation {
    initializeUser(input: InitializeUserInput!): InitializeUserResponse!
  }

  type Query {
    _empty: String
  }
`
