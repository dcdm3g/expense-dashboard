import { trpc } from '@/lib/trpc/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

export async function InvestmentsCard() {
	const { investmentBalance } = await trpc.getInvestmentBalance()

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Investments</CardTitle>
				<TrendingUp className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<p className="text-3xl font-bold">{investmentBalance}</p>
			</CardContent>
		</Card>
	)
}
