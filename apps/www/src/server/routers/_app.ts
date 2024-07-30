import { mergeRouters } from '@/server/trpc'
import { authenticationRouter } from '@/server/routers/authentication'
import { dashboardRouter } from '@/server/routers/dashboard'

export const appRouter = mergeRouters(authenticationRouter, dashboardRouter)

export type AppRouter = typeof appRouter
