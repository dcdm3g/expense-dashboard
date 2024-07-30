import 'server-only'

import { jwtVerify } from 'jose'

export async function verifyAccessToken(accessToken: string) {
	try {
		const verifiedAccessToken = await jwtVerify(
			accessToken,
			new TextEncoder().encode(process.env.JWT_SECRET),
		)

		return verifiedAccessToken.payload as {
			jti: string
			iat: number
			sub: string
			exp: number
		}
	} catch (error) {
		return null
	}
}
