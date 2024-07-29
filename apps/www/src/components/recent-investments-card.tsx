import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

const recentInvestments = [
	{
		id: 1,
		category: 'Fixed Income',
		amount: 500.98,
		created_at: 'Yesterday',
	},
	{
		id: 2,
		category: 'Equities',
		amount: 1000.24,
		created_at: '2 days ago',
	},
	{
		id: 3,
		category: 'Real Estate',
		amount: 1000.32,
		created_at: '5 days ago',
	},
	{
		id: 4,
		category: 'Cryptocurrencies',
		amount: 300.43,
		created_at: '5 days ago',
	},
	{
		id: 5,
		category: 'Real Estate',
		amount: 1500.44,
		created_at: '7 days ago',
	},
]

export function RecentInvestmentsCard() {
	return (
		<Card className="lg:col-span-3">
			<CardHeader>
				<CardTitle>Recent Investments</CardTitle>
				<CardDescription>You made 7 investments this month</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-8">
					{recentInvestments.map(({ id, category, amount, created_at }) => (
						<div key={id} className="flex items-center">
							<div className="size-9 flex items-center justify-center rounded-full bg-muted">
								<TrendingUp className="size-4 text-muted-foreground" />
							</div>

							<div className="ml-4 space-y-1">
								<p className="text-sm font-medium leading-none">{category}</p>
								<p className="text-sm text-muted-foreground">{created_at}</p>
							</div>

							<div className="ml-auto font-medium">
								{Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: 'USD',
								}).format(amount)}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
