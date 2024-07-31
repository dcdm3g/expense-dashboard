import 'server-only'

import { createTRPCRouter, procedure } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { formatMonetary } from '@/utils/format-monetary'

export const accountRouter = createTRPCRouter({
	getUserName: procedure.query(async ({ ctx }) => {
		const userFromId = await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
			select: {
				name: true,
			},
		})

		if (!userFromId) {
			throw new TRPCError({ code: 'UNAUTHORIZED' })
		}

		return { name: userFromId.name }
	}),
	getUserBalance: procedure.query(async ({ ctx }) => {
		const userFromId = await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
			select: {
				balance: true,
			},
		})

		if (!userFromId) {
			throw new TRPCError({ code: 'UNAUTHORIZED' })
		}

		return {
			balance: formatMonetary(Number(userFromId.balance)),
		}
	}),
})
