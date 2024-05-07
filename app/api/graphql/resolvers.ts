import { db } from '@/db/db'
import { InsertIssues, SelectIssues, issues, users } from '@/db/schema'
import { GQLContext } from '@/types'
import { getUserFromToken, signin, signup } from '@/utils/auth'
import { and, asc, desc, eq, or, sql } from 'drizzle-orm'
import { GraphQLError } from 'graphql'

export const resolvers = {
  IssueStatus: {
    BACKLOG: 'backlog',
    TODO: 'todo',
    INPROGRESS: 'inprogress',
    DONE: 'done',
  },
  Query: {
    me: (_, __, ctx: GQLContext) => {
      return ctx.user
    },
    issues: async (_, { input }, ctx) => {
      if (!ctx.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      const andFilters = [eq(issues.userId, ctx.user.id)]

      if (input && input.statuses) {
        const statusFilters = input.statuses.map((status) =>
          eq(issues.status, status)
        )

        andFilters.push(or(...statusFilters))
      }

      const data = await db.query.issues.findMany({
        where: and(...andFilters),
        orderBy: [
          asc(sql`case ${issues.status}
        when "backlog" then 1
        when "inprogress" then 2
        when "done" then 3
      end`),
          desc(issues.createdAt),
        ],
      })

      return data
    },
  },
  Mutation: {
    createIssue: async (_, { input }, ctx: GQLContext) => {
      if (!ctx.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      const data = await db
        .insert(issues)
        .values({ userId: ctx.user.id, ...input })
        .returning()

      return data[0]
    },
    signin: async (_, { input }, ctx) => {
      const data = await signin(input)

      if (!data || !data.token || !data.user) {
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })
      }

      return { ...data.user, token: data.token }
    },
    createUser: async (_, { input }) => {
      const data = await signup(input)

      if (!data || !data.token || !data.user) {
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })
      }

      return { ...data.user, token: data.token }
    },
  },
  Issue: {
    user: (issue, _, ctx) => {
      if (!ctx.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      return db.query.users.findFirst({
        where: eq(users.id, issue.userId),
      })
    },
  },

  User: {
    issues: (user, _, ctx) => {
      if (!ctx.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      return db.query.issues.findMany({
        where: eq(issues.userId, user.id),
      })
    },
  },
}
