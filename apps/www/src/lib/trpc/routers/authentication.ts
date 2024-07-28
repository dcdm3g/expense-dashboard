import 'server-only'

import { z } from 'zod'
import { createTRPCRouter, procedure } from '@/lib/trpc/trpc'
import { prisma } from '@/lib/prisma'
import { TRPCError } from '@trpc/server'
import { hash } from 'bcrypt'
import { generateAccessToken } from '@/utils/generate-access-token'
import { cookies } from 'next/headers'

export const authenticationRouter = createTRPCRouter({
	register: procedure
		.input(
			z.object({
				name: z.string().trim().min(1),
				email: z.string().email(),
				password: z.string().trim().min(8),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { name, email, password } = input

			const userFromEmail = await prisma.user.findUnique({
				where: { email },
			})

			if (userFromEmail) {
				throw new TRPCError({
					code: 'CONFLICT',
					message: 'This email is already registered.',
				})
			}

			const { id } = await prisma.user.create({
				data: {
					name,
					email,
					password: await hash(password, 10),
				},
			})

			const accessToken = await generateAccessToken(id)

			cookies().set('access_token', accessToken, {
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 90, // 90 days
			})
		}),
})
