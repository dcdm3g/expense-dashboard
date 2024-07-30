'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createAccessToken } from '@/utils/create-access-token'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import bcrypt from 'bcrypt'

const registerFormSchema = z.object({
	name: z
		.string({ required_error: 'Enter your name' })
		.trim()
		.min(1, 'Enter your name'),
	email: z
		.string({ required_error: 'Enter your email' })
		.email('Must be a valid email')
		.refine(
			async (email) => {
				const userFromEmail = await prisma.user.findUnique({
					where: { email },
				})

				return !userFromEmail
			},
			{ message: 'This email is already registered' },
		),
	password: z
		.string({ required_error: 'Enter your password' })
		.trim()
		.min(8, 'Must be at least 8 characters'),
})

export async function register(_: unknown, formData: FormData) {
	const parsedFields = await registerFormSchema.safeParseAsync({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	})

	if (!parsedFields.success) {
		const { fieldErrors } = parsedFields.error.flatten()
		return fieldErrors
	}

	const { name, email, password } = parsedFields.data

	const { id } = await prisma.user.create({
		data: {
			name,
			email,
			password: await bcrypt.hash(password, 10),
		},
	})

	const accessToken = await createAccessToken(id)

	cookies().set('access_token', accessToken, {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 90, // 90 days
	})

	redirect('/')
}
