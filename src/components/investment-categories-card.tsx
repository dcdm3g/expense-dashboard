import { trpc } from '@/lib/trpc/server'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { InvestmentCategoriesChart } from '@/components/investment-categories-chart'

export async function InvestmentCategoriesCard() {
	const { investmentCategories } = await trpc.getInvestmentCategories()

	return (
		<Card className="lg:col-span-4">
			<CardHeader>
				<CardTitle>Investment Categories</CardTitle>
			</CardHeader>
			<CardContent className="pl-2">
				<InvestmentCategoriesChart
					investmentCategories={investmentCategories}
				/>
			</CardContent>
		</Card>
	)
}
