import { mergeRouters } from '@/server/trpc'
import { authenticationRouter } from '@/server/routers/authentication'

export const appRouter = mergeRouters(authenticationRouter)

export type AppRouter = typeof appRouter
