export const schema = `#graphql
  type Issue {
    id: ID!
    name: String!
    content: String!
    userId: ID!
    projectId: ID!
    user: User!
    status: IssueStatus
    createdAt: String!
  }

  input CreateIssueInput {
    name: String!
    content: String!
    status: IssueStatus
  }

  enum IssueStatus {
    DONE
    TODO
    INPROGRESS
    BACKLOG
  }


  type User {
    id: ID!
    email: String!
    createdAt: String!
    token: String
  }

  input AuthInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signin(input: AuthInput!): User
    createUser(input: AuthInput!): User
    createIssue(input: CreateIssueInput!): Issue
  }
`
