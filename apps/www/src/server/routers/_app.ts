import { mergeRouters } from '@/server/trpc'
import { authenticationRouter } from '@/server/routers/authentication'
import { profileRouter } from '@/server/routers/profile'
import { investmentsRouter } from '@/server/routers/investments'
import { invoicesRouter } from '@/server/routers/invoices'
import { goalsRouter } from '@/server/routers/goals'

export const appRouter = mergeRouters(
	authenticationRouter,
	profileRouter,
	investmentsRouter,
	investmentsRouter,
	goalsRouter,
)

export type AppRouter = typeof appRouter
