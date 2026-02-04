import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas públicas que não requerem autenticação
const publicPaths = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/academy',
    '/blog',
    '/board',
    '/policies',
    '/2fa',
];

// Rotas que requerem autenticação
const protectedPaths = [
    '/dashboard',
    '/dashboard/create-article',  // Apenas membros associados
    '/dashboard/my-articles',     // Apenas membros associados
    '/dashboard/edit-article',    // Apenas membros associados
    '/academy/lab',               // Algor Lab (Netflix-style) - Apenas membros
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Verificar se a rota é protegida
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

    if (!isProtectedPath) {
        return NextResponse.next();
    }

    // Verificar token de autenticação
    const token = request.cookies.get('access_token')?.value;

    if (!token) {
        // Redirecionar para login se não autenticado
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Token existe, permitir acesso
    // Nota: Validação real do JWT deve ser feita no backend
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|icon.png).*)',
    ],
};
