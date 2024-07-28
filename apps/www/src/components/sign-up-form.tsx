'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const signUpFormSchema = z.object({
	name: z
		.string({ required_error: 'Enter your name' })
		.trim()
		.min(1, 'Enter your name'),
	email: z
		.string({ required_error: 'Enter your email' })
		.email('Must be a valid email'),
	password: z
		.string({ required_error: 'Enter your password' })
		.trim()
		.min(8, 'Must be at least 8 characters'),
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignUpForm() {
	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpFormSchema),
	})

	function signUp(data: SignUpFormData) {}

	return (
		<Form {...form}>
			<form className="mt-6 grid gap-4" onSubmit={form.handleSubmit(signUp)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Your full name</FormLabel>

							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Your email</FormLabel>

							<FormControl>
								<Input
									type="email"
									placeholder="johndoe@example.com"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Your password</FormLabel>

							<FormControl>
								<Input type="password" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" size="lg">
					Create account
				</Button>
			</form>
		</Form>
	)
}
