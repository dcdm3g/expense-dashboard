import type { InvestmentCategory } from '@prisma/client'

export function formatInvestmentCategory(category: InvestmentCategory) {
	return category
		.split('_')
		.map((w) => `${w[0]}${w.slice(1).toLowerCase()}`)
		.join(' ')
}
