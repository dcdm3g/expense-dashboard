interface TRPCContext {
	headers: Headers
}

export async function createTRPCContext(options: TRPCContext) {
	return { ...options }
}
