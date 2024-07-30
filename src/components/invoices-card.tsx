import { trpc } from '@/lib/trpc/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'

export async function InvoicesCard() {
	const { invoiceCount } = await trpc.getInvoiceCount()

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Invoices</CardTitle>
				<CreditCard className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<p className="text-3xl font-bold">{invoiceCount}</p>
			</CardContent>
		</Card>
	)
}
