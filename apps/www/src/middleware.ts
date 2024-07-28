import { type NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/utils/verify-access-token'

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get('access_token')?.value
	const { pathname } = request.nextUrl

	const isAuthenticated = accessToken && (await verifyAccessToken(accessToken))
	const isSignUpOrSignInRoute = ['/sign-up', '/sign-in'].includes(pathname)

	if (!isAuthenticated && !isSignUpOrSignInRoute) {
		return NextResponse.redirect(new URL('/sign-up', request.url))
	}

	if (isAuthenticated && isSignUpOrSignInRoute) {
		return NextResponse.redirect(new URL('/', request.url))
	}
}
