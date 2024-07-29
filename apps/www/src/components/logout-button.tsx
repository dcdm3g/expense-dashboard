import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
	return (
		<Button variant="outline">
			<LogOut className="size-4 mr-2" />
			Logout
		</Button>
	)
}
