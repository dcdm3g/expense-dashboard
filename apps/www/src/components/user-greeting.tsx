'use client'

import { motion } from 'framer-motion'

const name = 'Davi Melo'
const text = `Hello ${name}`

export function UserGreeting() {
	return (
		<h1 className="text-4xl font-bold tracking-tight">
			{text.split(' ').map((word, index) => (
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
