import type { PrismaClient } from "@prisma/client"

interface TRPCContext {
	headers: Headers
	prisma: PrismaClient
}

export async function createTRPCContext(options: TRPCContext) {
	return { ...options }
}
