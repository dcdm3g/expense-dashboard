import 'server-only'

import { createTRPCRouter, authedProcedure } from '@/server/trpc'
import { prisma } from '@/lib/prisma'
import { TRPCError } from '@trpc/server'

export const dashboardRouter = createTRPCRouter({
	getUserName: authedProcedure.query(async ({ ctx }) => {
		const userFromId = await prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
		})

		if (!userFromId) {
			throw new TRPCError({ code: 'UNAUTHORIZED' })
		}

		return { name: userFromId.name }
	}),
})
