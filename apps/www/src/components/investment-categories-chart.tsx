'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
	{
		name: 'Fixed Income',
		amount: 500.98,
	},
	{
		name: 'Equities',
		amount: 1000.24,
	},
	{
		name: 'Real Estate',
		amount: 2500.76,
	},
	{
		name: 'Mutual Funds',
		amount: 800.25,
	},
	{
		name: 'Cryptocurrencies',
		amount: 300.43,
	},
	{
		name: 'Commodities',
		amount: 200.04,
	},
]

export function InvestmentCategoriesChart() {
	return (
		<Card className="lg:col-span-4">
			<CardHeader>
				<CardTitle>Investment Categories</CardTitle>
			</CardHeader>
			<CardContent className="pl-2">
				<ResponsiveContainer width="100%" height={350}>
					<BarChart data={data}>
						<XAxis
							dataKey="name"
							stroke="#888888"
							fontSize={12}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
							stroke="#888888"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `$${value}`}
						/>
						<Bar
							dataKey="amount"
							fill="currentColor"
							radius={[4, 4, 0, 0]}
							className="fill-primary"
						/>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
