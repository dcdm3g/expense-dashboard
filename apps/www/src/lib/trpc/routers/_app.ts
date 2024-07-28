import { mergeRouters } from '@/lib/trpc/trpc'
import { authenticationRouter } from '@/lib/trpc/routers/authentication'

export const appRouter = mergeRouters(authenticationRouter)

export type AppRouter = typeof appRouter
