'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createAccessToken } from '@/utils/create-access-token'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import bcrypt from 'bcrypt'

const loginFormSchema = z.object({
	email: z
		.string({ required_error: 'Enter your email' })
		.email('Must be a valid email'),
	password: z
		.string({ required_error: 'Enter your password' })
		.trim()
		.min(1, 'Enter your password'),
})

export async function login(_: unknown, formData: FormData) {
	const parsedFields = loginFormSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	})

	if (!parsedFields.success) {
		const { fieldErrors } = parsedFields.error.flatten()
		return fieldErrors
	}

	const { email, password } = parsedFields.data

	const userFromEmail = await prisma.user.findUnique({
		where: { email },
	})

	if (!userFromEmail) {
		return { email: ['This email is not registered'] }
	}

	const passwordsMatch = await bcrypt.compare(password, userFromEmail.password)

	if (!passwordsMatch) {
		return { password: ['Incorrect password'] }
	}

	const accessToken = await createAccessToken(userFromEmail.id)

	cookies().set('access_token', accessToken, {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 90, // 90 days
	})

	redirect('/')
}
