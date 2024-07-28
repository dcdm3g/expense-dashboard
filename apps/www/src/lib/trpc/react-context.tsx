'use client'

import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/lib/trpc/routers/_app'
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { createQueryClient } from '@/lib/trpc/query-client'
import { createTRPCReact } from '@trpc/react-query'
import { loggerLink, httpBatchLink } from '@trpc/client'
import SuperJSON from 'superjson'

let clientQueryClientSingleton: QueryClient | undefined = undefined

const getQueryClient = () => {
	if (typeof window === 'undefined') {
		return createQueryClient()
	}

	if (!clientQueryClientSingleton) {
		clientQueryClientSingleton = createQueryClient()
	}

	return clientQueryClientSingleton
}

export const trpc = createTRPCReact<AppRouter>()

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>

interface TRPCProviderProps {
	children: ReactNode
}

export function TRPCProvider({ children }: TRPCProviderProps) {
	const queryClient = getQueryClient()

	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				loggerLink({
					enabled: (op) =>
						process.env.NODE_ENV === 'development' ||
						(op.direction === 'down' && op.result instanceof Error),
				}),
				httpBatchLink({
					transformer: SuperJSON,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/trpc`,
					headers: () => {
						const headers = new Headers()
						headers.set('x-trpc-source', 'nextjs-react')
						return headers
					},
				}),
			],
		}),
	)

	return (
		<QueryClientProvider client={queryClient}>
			<trpc.Provider client={trpcClient} queryClient={queryClient}>
				{children}
			</trpc.Provider>
		</QueryClientProvider>
	)
}
