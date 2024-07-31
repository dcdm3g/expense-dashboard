import 'server-only'

import { createTRPCRouter, procedure } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { formatMonetary } from '@/utils/format-monetary'
import { formatInvestmentCategory } from '@/utils/format-investment-category'
import { startOfMonth, endOfMonth, formatDistanceStrict } from 'date-fns'

export const investmentsRouter = createTRPCRouter({
	getInvestmentBalance: procedure.query(async ({ ctx }) => {
		const userFromId = await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
			select: {
				investment_balance: true,
			},
		})

		if (!userFromId) {
			throw new TRPCError({ code: 'UNAUTHORIZED' })
		}

		return {
			investmentBalance: formatMonetary(Number(userFromId.investment_balance)),
		}
	}),
	getInvestmentCategories: procedure.query(async ({ ctx }) => {
		const investmentCategories = await ctx.prisma.investment.groupBy({
			by: ['category'],
			_sum: {
				amount: true,
			},
		})

		return {
			investmentCategories: investmentCategories.map(({ category, _sum }) => ({
				name: formatInvestmentCategory(category),
				amount: Number(_sum.amount),
			})),
		}
	}),
	getRecentInvestments: procedure.query(async ({ ctx }) => {
		const [latestInvestments, investmentThisMonthCount] = await Promise.all([
			await ctx.prisma.investment.findMany({ take: 5 }),
			await ctx.prisma.investment.count({
				where: {
					created_at: {
						gte: startOfMonth(new Date()),
						lte: endOfMonth(new Date()),
					},
				},
			}),
		])

		return {
			latestInvestments: latestInvestments.map((investment) => ({
				id: investment.id,
				category: formatInvestmentCategory(investment.category),
				amount: formatMonetary(Number(investment.amount)),
				created_at: formatDistanceStrict(investment.created_at, new Date(), {
					addSuffix: true,
				}),
			})),
			investmentThisMonthCount,
		}
	}),
})
