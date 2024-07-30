import type { NextRequest } from 'next/server'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers/_app'
import { createTRPCContext } from '@/server/context'
import { prisma } from '@/lib/prisma'

function handler(req: NextRequest) {
	return fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		createContext: () =>
			createTRPCContext({ headers: req.headers, prisma }),
	})
}

export { handler as GET, handler as POST }
