import { initTRPC } from '@trpc/server'
import SuperJSON from 'superjson'

export function createTRPCContext(options: { headers: Headers }) {
	return { ...options }
}

export const {
	router: createTRPCRouter,
	procedure,
	createCallerFactory,
	mergeRouters,
} = initTRPC.context<typeof createTRPCContext>().create({
	transformer: SuperJSON,
})
