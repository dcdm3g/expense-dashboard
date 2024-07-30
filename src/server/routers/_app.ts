import { mergeRouters } from '@/server/trpc'
import { authenticationRouter } from '@/server/routers/authentication'
import { accountRouter } from '@/server/routers/account'
import { investmentsRouter } from '@/server/routers/investments'
import { invoicesRouter } from '@/server/routers/invoices'
import { goalsRouter } from '@/server/routers/goals'

export const appRouter = mergeRouters(
	authenticationRouter,
	accountRouter,
	investmentsRouter,
	invoicesRouter,
	goalsRouter,
)

export type AppRouter = typeof appRouter
