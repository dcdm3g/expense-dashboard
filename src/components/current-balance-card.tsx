import { trpc } from '@/lib/trpc/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'

export async function CurrentBalanceCard() {
	const { balance } = await trpc.getUserBalance()

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Current Balance</CardTitle>
				<DollarSign className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<p className="text-3xl font-bold">{balance}</p>
			</CardContent>
		</Card>
	)
}
