import { db } from '@/db/db'
import { InsertIssues, SelectIssues, issues, users } from '@/db/schema'
import { GQLContext } from '@/types'
import { getUserFromToken, signin, signup } from '@/utils/auth'
import { and, asc, desc, eq, or, sql } from 'drizzle-orm'
import { GraphQLError } from 'graphql'

export const resolvers = {
  Query: {
    me: (_, __, ctx: GQLContext) => {
      return ctx.user
    },
  },
  Mutation: {
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
}
