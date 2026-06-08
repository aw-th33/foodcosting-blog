import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/blog') {
    return NextResponse.redirect(new URL('/', request.url), 301)
  }

  if (pathname.startsWith('/blog/')) {
    const newPath = pathname.replace(/^\/blog/, '')
    return NextResponse.redirect(new URL(newPath, request.url), 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/blog/:path*',
}
