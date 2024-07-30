'use client'

import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface SubmitButtonProps {
	children?: ReactNode
}

export function SubmitButton({ children }: SubmitButtonProps) {
	const { pending } = useFormStatus()

	return (
		<Button disabled={pending} type="submit" size="lg">
			{pending ? (
				<>
					<Loader2 className="size-4 mr-2 animate-spin" />
					Please wait
				</>
			) : (
				children
			)}
		</Button>
	)
}
