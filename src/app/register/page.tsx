import { RegisterForm } from '@/components/register-form'
import Link from 'next/link'

export default function Register() {
	return (
		<div className="min-h-screen flex justify-center items-center px-4 py-6">
			<main className="max-w-md w-full space-y-6">
				<div className="space-y-2.5">
					<h1 className="text-2xl font-bold md:text-3xl">
						Create your account
					</h1>

					<p className="text-sm">
						Already have an account?{' '}
						<Link href="/sign-in" className="underline font-bold">
							Sign in
						</Link>
					</p>
				</div>

				<RegisterForm />
			</main>
		</div>
	)
}
