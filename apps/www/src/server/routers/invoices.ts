import 'server-only'
import { createTRPCRouter, authedProcedure } from '@/server/trpc'

export const invoicesRouter = createTRPCRouter({
	getInvoiceCount: authedProcedure.query(async ({ ctx }) => {
		return {
			invoiceCount: await ctx.prisma.invoice.count(),
		}
	}),
})
