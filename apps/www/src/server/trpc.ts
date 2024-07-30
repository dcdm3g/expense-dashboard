import type { createTRPCContext } from '@/server/context'
import { initTRPC } from '@trpc/server'
import SuperJSON from 'superjson'

export const {
	router: createTRPCRouter,
	procedure,
	createCallerFactory,
	mergeRouters,
} = initTRPC.context<typeof createTRPCContext>().create({
	transformer: SuperJSON,
})
