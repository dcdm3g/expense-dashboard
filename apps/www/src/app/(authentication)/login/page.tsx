import { LoginForm } from '@/components/login-form'
import Link from 'next/link'

export default function Login() {
	return (
		<div className="max-w-md w-full">
			<div className="grid gap-2 text-center">
				<h1 className="text-2xl font-bold">Welcome again</h1>

				<p className="text-muted-foreground text-pretty">
					Enter your credentials to procced to your dashboard.
				</p>
			</div>

			<LoginForm />

			<p className="mt-10 text-center text-sm">
				Don't have an account?{' '}
				<Link className="underline" href="/login">
          Register
				</Link>
			</p>
		</div>
	)
}
