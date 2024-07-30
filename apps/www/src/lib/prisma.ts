import { PrismaClient } from '@prisma/client'

declare const globalThis: {
	prisma: ReturnType<typeof createPrismaClient>
} & typeof global

function createPrismaClient() {
	return new PrismaClient()
}

export const prisma = globalThis.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
	globalThis.prisma = prisma
}
