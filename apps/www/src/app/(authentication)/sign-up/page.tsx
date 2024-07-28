import { SignUpForm } from '@/components/sign-up-form'
import Link from 'next/link'

export default function SignUp() {
	return (
		<div className="max-w-md w-full">
			<div className="grid gap-2 text-center">
				<h1 className="text-2xl font-bold">Get Started</h1>

				<p className="text-muted-foreground text-pretty">
					Create your account to procced to your dashboard.
				</p>
			</div>

			<SignUpForm />

			<p className="mt-10 text-center text-sm">
				Don't have an account?{' '}
				<Link className="underline" href="/sign-in">
					Sign in
				</Link>
			</p>
		</div>
	)
}
