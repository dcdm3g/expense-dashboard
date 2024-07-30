import { trpc } from '@/lib/trpc/server'
import { motion } from '@/lib/framer-motion'

export async function UserGreeting() {
	const { name } = await trpc.getUserName()

	return (
		<h1 className="text-4xl font-bold tracking-tight">
			{`Hello ${name}`.split(' ').map((word, index) => (
				<motion.span
					key={index}
					className="text-4xl font-bold"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4, delay: index / 10 }}
				>
					{word}{' '}
				</motion.span>
			))}
		</h1>
	)
}
