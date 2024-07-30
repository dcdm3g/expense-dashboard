'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LogOut, Loader2 } from 'lucide-react'
import { logout } from '@/actions/logout'

export function LogoutButton() {
	const [isPending, setIsPending] = useState(false)

	return (
		<Button
			variant="outline"
			className="w-28"
			disabled={isPending}
			onClick={async () => {
				setIsPending(true)

				logout().finally(() => {
					setIsPending(false)
				})
			}}
		>
			{isPending ? (
				<Loader2 className="size-4 animate-spin" />
			) : (
				<>
					<LogOut className="size-4 mr-2" />
					Logout
				</>
			)}
		</Button>
	)
}
