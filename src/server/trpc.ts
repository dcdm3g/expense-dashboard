import type { createTRPCContext } from '@/server/context'
import { initTRPC } from '@trpc/server'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/utils/verify-access-token'
import { TRPCError } from '@trpc/server'
import SuperJSON from 'superjson'

export const {
	router: createTRPCRouter,
	procedure: publicProcedure,
	createCallerFactory,
	mergeRouters,
} = initTRPC.context<typeof createTRPCContext>().create({
	transformer: SuperJSON,
})

export const authedProcedure = publicProcedure.use(async (opts) => {
	const accessToken = cookies().get('access_token')?.value

	const verifiedAccessToken =
		accessToken && (await verifyAccessToken(accessToken))

	if (!verifiedAccessToken) {
		throw new TRPCError({ code: 'UNAUTHORIZED' })
	}

	return opts.next({
		ctx: {
			userId: verifiedAccessToken.sub,
		},
	})
})
