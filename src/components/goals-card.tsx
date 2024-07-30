import { trpc } from '@/lib/trpc/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Goal } from 'lucide-react'

export async function GoalsCard() {
	const { goalCount } = await trpc.getGoalCount()

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Goals</CardTitle>
				<Goal className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<p className="text-3xl font-bold">{goalCount}</p>
			</CardContent>
		</Card>
	)
}
