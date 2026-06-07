import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const url = request.nextUrl

  // Bloquer les accès aux fichiers sensibles
  if (
    url.pathname.includes('.env') ||
    url.pathname.includes('.git') ||
    url.pathname.includes('wp-admin') ||
    url.pathname.includes('adminer') ||
    url.pathname.includes('phpmyadmin')
  ) {
    return new NextResponse('Accès interdit', { status: 403 })
  }

  // Limiter les requêtes API (anti brute force)
  if (url.pathname.startsWith('/api/') && request.method === 'POST') {
    const userAgent = request.headers.get('user-agent') || ''
    // Bloquer les bots connus
    if (userAgent.includes('bot') || userAgent.includes('crawl') || userAgent.includes('spider')) {
      return new NextResponse('Bot non autorisé', { status: 403 })
    }
  }

  // Protection admin
  if (url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login')) {
    // Vérification basique - en production, utiliser un vrai token JWT
    const referer = request.headers.get('referer') || ''
  }

  // Headers de sécurité
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|public).*)',
  ],
}
