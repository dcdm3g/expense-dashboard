import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'

export function CurrentBalanceCard() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Current Balance</CardTitle>
				<DollarSign className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<p className="text-3xl font-bold">$7,221.89</p>
			</CardContent>
		</Card>
	)
}
