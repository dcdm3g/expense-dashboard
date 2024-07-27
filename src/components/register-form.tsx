'use client'

import { useFormState } from 'react-dom'
import { register } from '@/actions/register'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function RegisterForm() {
	const [errors, action, isPending] = useFormState(register, null)

	return (
		<form action={action} className="w-full space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Your name</Label>
				<Input id="name" name="name" required />

				{errors?.name && (
					<p className="text-[0.8rem] font-medium text-destructive">
						{errors.name}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="email">Your email</Label>
				<Input id="email" name="email" type="email" required />

				{errors?.email && (
					<p className="text-[0.8rem] font-medium text-destructive">
						{errors.email}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">Your password</Label>
				<Input id="password" name="password" type="password" min={8} required />

				{errors?.password && (
					<p className="text-[0.8rem] font-medium text-destructive">
						{errors.password}
					</p>
				)}
			</div>

			<Button disabled={isPending} className="w-full" size="lg">
				{isPending ? 'Creating...' : 'Create account'}
			</Button>
		</form>
	)
}
