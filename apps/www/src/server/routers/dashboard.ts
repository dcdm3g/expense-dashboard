import 'server-only'

import { createTRPCRouter, authedProcedure } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { formatDistanceStrict, startOfMonth, endOfMonth } from 'date-fns'
import { formatMonetary } from '@/utils/format-monetary'
import { formatInvestmentCategory } from '@/utils/format-investment-category'

export const dashboardRouter = createTRPCRouter({
	getUserName: authedProcedure.query(async ({ ctx }) => {
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
	getUserBalance: authedProcedure.query(async ({ ctx }) => {
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
	getInvestmentBalance: authedProcedure.query(async ({ ctx }) => {
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
	getInvoiceCount: authedProcedure.query(async ({ ctx }) => {
		return {
			invoiceCount: await ctx.prisma.invoice.count(),
		}
	}),
	getGoalCount: authedProcedure.query(async ({ ctx }) => {
		return {
			goalCount: await ctx.prisma.goal.count(),
		}
	}),
	getInvestmentCategories: authedProcedure.query(async ({ ctx }) => {
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
	getRecentInvestments: authedProcedure.query(async ({ ctx }) => {
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
