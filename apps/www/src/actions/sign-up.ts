'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { generateAccessToken } from '@/utils/generate-access-token'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const formSchema = z.object({
	name: z.string().trim().min(1, 'Must be a valid name'),
	email: z
		.string()
		.email('Must be a valid email')
		.refine(
			async (email) => {
				const userWithSameEmail = await prisma.user.findUnique({
					where: { email },
				})

				return !userWithSameEmail
			},
			{ message: 'Email already in use' },
		),
	password: z.string().min(8, 'Must be at least 8 characters'),
})

interface SignUpErrors {
	name?: string
	email?: string
	password?: string
}

export async function signUp(
	_: SignUpErrors | null,
	formData: FormData,
): Promise<SignUpErrors | null> {
	const fields = {
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	}

	const parsedFields = await formSchema.safeParseAsync(fields)

	if (!parsedFields.success) {
		const { fieldErrors } = parsedFields.error.flatten()

		return {
			name: fieldErrors.name?.[0],
			email: fieldErrors.email?.[0],
			password: fieldErrors.password?.[0],
		}
	}

	const { name, email, password } = parsedFields.data

	const { id: userId } = await prisma.user.create({
		data: {
			name,
			email,
			password: await hash(password, 10),
		},
	})

	const accessToken = await generateAccessToken(userId)

	cookies().set('access_token', accessToken, {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 90, // 90 days
	})

	redirect('/')
}
