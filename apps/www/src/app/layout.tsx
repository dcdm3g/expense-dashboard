import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { TRPCProvider } from '@/lib/trpc/react'
import './globals.css'

const inter = Inter({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Fin.com',
	description: 'Manage your finances masterfully.',
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
