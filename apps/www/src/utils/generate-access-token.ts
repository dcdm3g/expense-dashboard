import 'server-only'

import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'

export async function generateAccessToken(userId: string) {
	const accessToken = await new SignJWT({})
		.setProtectedHeader({ alg: 'HS256' })
		.setJti(nanoid())
		.setIssuedAt()
		.setSubject(userId)
		.setExpirationTime('90d')
		.sign(new TextEncoder().encode(process.env.JWT_SECRET))

	return accessToken
}
