import { RegisterForm } from '@/components/register-form'
import Link from 'next/link'

export default function Register() {
	return (
		<div className="max-w-md w-full">
			<div className="grid gap-2 text-center">
				<h1 className="text-2xl font-bold">Get Started</h1>

				<p className="text-muted-foreground text-pretty">
					Create your account to procced to your dashboard.
				</p>
			</div>

			<RegisterForm />

			<p className="mt-10 text-center text-sm">
				Already have an account?{' '}
				<Link className="underline" href="/login">
					Log in
				</Link>
			</p>
		</div>
	)
}
