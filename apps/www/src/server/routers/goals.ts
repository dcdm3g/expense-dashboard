import 'server-only'

import { createTRPCRouter, authedProcedure } from '@/server/trpc'

export const goalsRouter = createTRPCRouter({
	getGoalCount: authedProcedure.query(async ({ ctx }) => {
		return {
			goalCount: await ctx.prisma.goal.count(),
		}
	}),
})
