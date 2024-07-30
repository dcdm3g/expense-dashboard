'use client'

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'

interface InvestmentCategoriesChartProps {
	investmentCategories: {
		name: string
		amount: number
	}[]
}

export function InvestmentCategoriesChart({
	investmentCategories,
}: InvestmentCategoriesChartProps) {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={investmentCategories}>
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
	)
}
