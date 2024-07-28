import type { ReactNode } from 'react'

interface AuthenticationLayoutProps {
	children: ReactNode
}

export default function AuthenticationLayout({
	children,
}: AuthenticationLayoutProps) {
	return (
		<div className="relative min-h-screen flex items-center justify-center lg:grid lg:grid-cols-2">
			<div className="hidden h-full bg-muted lg:block" />

			<main className="flex h-full items-center justify-center py-12 px-4 bg-background">
				{children}
			</main>
		</div>
	)
}
