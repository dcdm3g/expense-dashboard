import { LogoutButton } from '@/components/logout-button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { UserGreeting } from '@/components/user-greeting'
import { CurrentBalanceCard } from '@/components/current-balance-card'
import { InvestmentsCard } from '@/components/investments-card'
import { InvoicesCard } from '@/components/invoices-card'
import { GoalsCard } from '@/components/goals-card'
import { InvestmentCategoriesChart } from '@/components/investment-categories-chart'
import { RecentInvestmentsCard } from '@/components/recent-investments-card'

export default function Home() {
	return (
		<div className="min-h-screen">
			<header className="flex justify-end items-center h-16 gap-2 px-4 border-b">
				<LogoutButton />
				<ThemeSwitcher />
			</header>

			<main className="p-4 md:p-8 md:pt-6 flex flex-col gap-6">
				<UserGreeting />

				<div className="flex flex-col gap-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<CurrentBalanceCard />
						<InvestmentsCard />
						<InvoicesCard />
						<GoalsCard />
					</div>

					<div className="grid gap-4 lg:grid-cols-7">
						<InvestmentCategoriesChart />
						<RecentInvestmentsCard />
					</div>
				</div>
			</main>
		</div>
	)
}
