import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { TRPCProvider } from '@/lib/trpc/react'
import './globals.css'

const inter = Inter({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Expense Dashboard',
	description: 'Personal expense dashboard with fictitious data.',
}

interface RootLayoutProps {
	children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<TRPCProvider>{children}</TRPCProvider>
			</body>
		</html>
	)
}
