import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Goal } from 'lucide-react'

export function GoalsCard() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Goals</CardTitle>
				<Goal className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<p className="text-3xl font-bold">4</p>
			</CardContent>
		</Card>
	)
}
