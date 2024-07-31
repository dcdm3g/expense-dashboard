import 'server-only'

import { createTRPCRouter, procedure } from '@/server/trpc'

export const goalsRouter = createTRPCRouter({
	getGoalCount: procedure.query(async ({ ctx }) => {
		return {
			goalCount: await ctx.prisma.goal.count(),
		}
	}),
})
