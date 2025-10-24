const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type PaginatedUsers {
    users: [User]!
    totalCount: Int!
    pageInfo: PageInfo!
  }

  type PageInfo {
    currentPage: Int!
    totalPages: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
    role: String
  }

  input UpdateUserInput {
    name: String
    email: String
    role: String
  }

  input PaginationInput {
    page: Int! = 1
    limit: Int! = 10
  }

  type Query {
    getUsers(pagination: PaginationInput): PaginatedUsers!
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: RegisterInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`;