'use client'

import type { TRPCClientErrorLike } from '@trpc/client'
import type { AppRouter } from '@/lib/trpc/routers/_app'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { trpc } from '@/lib/trpc/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
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
import { Loader2 } from 'lucide-react'

const loginFormSchema = z.object({
	email: z
		.string({ required_error: 'Enter your email' })
		.email('Must be a valid email'),
	password: z
		.string({ required_error: 'Enter your password' })
		.trim()
		.min(1, 'Enter your password'),
})

type LoginFormFields = z.infer<typeof loginFormSchema>

export function LoginForm() {
	const form = useForm<LoginFormFields>({
		resolver: zodResolver(loginFormSchema),
	})

	const { mutateAsync: login, isPending } = trpc.login.useMutation()
	const router = useRouter()

	async function handleSubmit({ email, password }: LoginFormFields) {
		try {
			await login({ email, password })
			router.replace('/')
		} catch (error) {
			const { data, message } = error as TRPCClientErrorLike<AppRouter>

			if (data?.code !== 'INTERNAL_SERVER_ERROR') {
				return toast.error(message)
			}

			toast.error('Oops, something went wrong! Try again later.')
		}
	}

	return (
		<Form {...form}>
			<form
				className="mt-6 grid gap-4"
				onSubmit={form.handleSubmit(handleSubmit)}
			>
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

				<Button disabled={isPending} type="submit" size="lg">
					{isPending ? (
						<>
							<Loader2 className="size-4 mr-2 animate-spin" />
							Please wait
						</>
					) : (
						'Log in'
					)}
				</Button>
			</form>
		</Form>
	)
}
