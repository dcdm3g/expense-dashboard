import 'server-only'

import { z } from 'zod'
import { createTRPCRouter, procedure } from '@/server/trpc'
import { prisma } from '@/lib/prisma'
import { TRPCError } from '@trpc/server'
import { generateAccessToken } from '@/utils/generate-access-token'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'

export const authenticationRouter = createTRPCRouter({
	register: procedure
		.input(
			z.object({
				name: z.string().trim().min(1),
				email: z.string().email(),
				password: z.string().trim().min(8),
			}),
		)
		.mutation(async ({ input }) => {
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
					password: await bcrypt.hash(password, 10),
				},
			})

			const accessToken = await generateAccessToken(id)

			cookies().set('access_token', accessToken, {
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 90, // 90 days
			})
		}),
	login: procedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string().trim().min(8),
			}),
		)
		.mutation(async ({ input }) => {
			const { email, password } = input

			const userFromEmail = await prisma.user.findUnique({
				where: { email },
			})

			if (!userFromEmail) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message:
						"This email is not registered. You need to register if it's your first time here.",
				})
			}

			const passwordsMatch = await bcrypt.compare(
				password,
				userFromEmail.password,
			)

			if (!passwordsMatch) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Incorret password.',
				})
			}

			const accessToken = await generateAccessToken(userFromEmail.id)

			cookies().set('access_token', accessToken, {
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 90, // 90 days
			})
		}),
	logout: procedure.mutation(() => {
		cookies().delete('access_token')
	}),
})
