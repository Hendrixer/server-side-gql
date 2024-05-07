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
    issues: [Issue]!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  input IssuesFilterInput {
    statuses: [IssueStatus!]
  }

  type Query {
    me: User
    issues(input: IssuesFilterInput): [Issue]!
  }

  type Mutation {
    signin(input: AuthInput!): User
    createUser(input: AuthInput!): User
    createIssue(input: CreateIssueInput!): Issue
  }
`
