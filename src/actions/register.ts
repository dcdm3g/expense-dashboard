'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { generateAccessToken } from '@/utils/generate-access-token'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const formSchema = z.object({
	name: z.string().trim().min(1, 'Must be a valid name'),
	email: z.string().email('Must be a valid email'),
	password: z.string().min(8, 'Must be at least 8 characters'),
})

type RegisterErrors = {
	name?: string
	email?: string
	password?: string
} | null

export async function register(
	_: RegisterErrors,
	formData: FormData,
): Promise<RegisterErrors> {
	const fields = {
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	}

	const parsedFields = formSchema.safeParse(fields)

	if (!parsedFields.success) {
		const { fieldErrors } = parsedFields.error.flatten()

		return {
			name: fieldErrors.name?.[0],
			email: fieldErrors.email?.[0],
			password: fieldErrors.password?.[0],
		}
	}

	const { name, email, password } = parsedFields.data
	const hashedPassword = await hash(password, 10)

	const userWithSameEmail = await prisma.user.findUnique({
		where: { email },
	})

	if (userWithSameEmail) {
		return { email: 'Email already in use' }
	}

	const { id: userId } = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	const accessToken = await generateAccessToken(userId)

	cookies().set('access_token', accessToken, {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 90, // 90 days
	})

	redirect('/')

	return null
}
