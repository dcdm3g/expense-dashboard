import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { NextRequest } from 'next/server'

import { router } from '@/lib/trpc/router'
import { createTRPCContext } from '@/lib/trpc/trpc'

function handler(req: NextRequest) {
	return fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: router,
		createContext: () => createTRPCContext({ headers: req.headers }),
	})
}

export { handler as GET, handler as POST }
