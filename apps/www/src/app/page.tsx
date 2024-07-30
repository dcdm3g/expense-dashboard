import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { LogoutButton } from '@/components/logout-button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { UserGreeting } from '@/components/user-greeting'
import { CurrentBalanceCard } from '@/components/current-balance-card'
import { InvestmentsCard } from '@/components/investments-card'
import { InvoicesCard } from '@/components/invoices-card'
import { GoalsCard } from '@/components/goals-card'
import { InvestmentCategoriesCard } from '@/components/investment-categories-card'
import { RecentInvestmentsCard } from '@/components/recent-investments-card'

export default function Home() {
	return (
		<div className="min-h-screen">
			<header className="flex justify-end items-center h-16 gap-2 px-4 border-b">
				<LogoutButton />
				<ThemeSwitcher />
			</header>

			<main className="p-4 md:p-8 md:pt-6 flex flex-col gap-6">
				<Suspense fallback={<Skeleton className="h-10 w-72" />}>
					<UserGreeting  />
				</Suspense>
				
				<div className="flex flex-col gap-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<Suspense fallback={<Skeleton className="h-[7.125rem]" />}>
							<CurrentBalanceCard />
						</Suspense>

						<Suspense fallback={<Skeleton className="h-[7.125rem]" />}>
							<InvestmentsCard />
						</Suspense>

						<Suspense fallback={<Skeleton className="h-[7.125rem]" />}>
							<InvoicesCard />
						</Suspense>

						<Suspense fallback={<Skeleton className="h-[7.125rem]" />}>
							<GoalsCard />
						</Suspense>
					</div>

					<div className="grid gap-4 lg:grid-cols-7">
						<Suspense
							fallback={<Skeleton className="h-[28rem] lg:col-span-4" />}
						>
							<InvestmentCategoriesCard />
						</Suspense>

						<Suspense
							fallback={
								<Skeleton className="h-[27.625rem] lg:h-full lg:col-span-3" />
							}
						>
							<RecentInvestmentsCard />
						</Suspense>
					</div>
				</div>
			</main>
		</div>
	)
}
