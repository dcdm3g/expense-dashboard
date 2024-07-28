import 'server-only'

import { createHydrationHelpers } from '@trpc/react-query/rsc'
import { headers } from 'next/headers'
import { cache } from 'react'

import { type AppRouter, appRouter } from '@/lib/trpc/routers/_app'
import { createCallerFactory } from '@/lib/trpc/trpc'
import { createTRPCContext } from '@/lib/trpc/trpc'
import { createQueryClient } from '@/lib/trpc/query-client'

const createContext = cache(() => {
	const heads = new Headers(headers())
	heads.set('x-trpc-source', 'rsc')

	return createTRPCContext({
		headers: heads,
	})
})

const getQueryClient = cache(createQueryClient)
const caller = createCallerFactory(appRouter)(createContext)

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(
	caller,
	getQueryClient,
)
