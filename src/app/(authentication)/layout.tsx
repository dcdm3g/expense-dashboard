import type { ReactNode } from 'react'
import { ThemeSwitcher } from '@/components/theme-switcher'

interface AuthenticationLayoutProps {
	children: ReactNode
}

export default function AuthenticationLayout({
	children,
}: AuthenticationLayoutProps) {
	return (
		<div className="relative min-h-screen flex items-center justify-center lg:grid lg:grid-cols-2">
			<div className="hidden h-full bg-muted lg:block" />

			<ThemeSwitcher className="absolute top-4 right-4 md:top-8 md:right-8" />

			<main className="flex h-full items-center justify-center py-12 px-4 bg-background">
				{children}
			</main>
		</div>
	)
}
