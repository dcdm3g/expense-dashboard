'use client'

import { useFormState } from 'react-dom'
import { register } from '@/actions/register'
import { cn } from '@/utils/cn'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/submit-button'

export function RegisterForm() {
	const [errors, dispatch, isPending] = useFormState(register, {})

	return (
		<form action={dispatch} className="mt-6 grid gap-4">
			<div className="space-y-2">
				<Label htmlFor="name" className={cn(errors.name && 'text-destructive')}>
					Your name
				</Label>

				<Input id="name" name="name" placeholder="John Doe" required />

				{errors.name?.map((error) => (
					<p key={error} className="text-sm font-meidum text-destructive">
						{error}
					</p>
				))}
			</div>

			<div className="space-y-2">
				<Label
					htmlFor="email"
					className={cn(errors.email && 'text-destructive')}
				>
					Your email
				</Label>

				<Input
					id="email"
					name="email"
					type="email"
					placeholder="johndoe@example.com"
					required
				/>

				{errors.email?.map((error) => (
					<p key={error} className="text-sm font-meidum text-destructive">
						{error}
					</p>
				))}
			</div>

			<div className="space-y-2">
				<Label
					htmlFor="password"
					className={cn(errors.password && 'text-destructive')}
				>
					Your password
				</Label>

				<Input
					id="password"
					name="password"
					type="password"
					placeholder="••••••••••••"
					minLength={8}
					required
				/>

				{errors.password?.map((error) => (
					<p key={error} className="text-sm font-meidum text-destructive">
						{error}
					</p>
				))}
			</div>

			<SubmitButton>Create account</SubmitButton>
		</form>
	)
}
