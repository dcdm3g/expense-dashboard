import { trpc } from '@/lib/trpc/server'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

export async function RecentInvestmentsCard() {
	const { investmentThisMonthCount, latestInvestments } =
		await trpc.getRecentInvestments()

	return (
		<Card className="lg:col-span-3">
			<CardHeader>
				<CardTitle>Recent Investments</CardTitle>
				<CardDescription>
					{investmentThisMonthCount
						? `You made ${investmentThisMonthCount} investments this month`
						: "You didn't make any investments this month"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-8">
					{latestInvestments.map(({ id, category, amount, created_at }) => (
						<div key={id} className="flex items-center">
							<div className="size-9 flex items-center justify-center rounded-full bg-muted">
								<TrendingUp className="size-4 text-muted-foreground" />
							</div>

							<div className="ml-4 space-y-1">
								<p className="text-sm font-medium leading-none">{category}</p>
								<p className="text-sm text-muted-foreground">{created_at}</p>
							</div>

							<div className="ml-auto font-medium">{amount}</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
