import 'server-only'
import { createTRPCRouter, procedure } from '@/server/trpc'

export const invoicesRouter = createTRPCRouter({
	getInvoiceCount: procedure.query(async ({ ctx }) => {
		return {
			invoiceCount: await ctx.prisma.invoice.count(),
		}
	}),
})
