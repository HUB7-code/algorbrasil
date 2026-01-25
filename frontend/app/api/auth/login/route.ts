import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// ========================================
// API: Login (Simplified - TODO: Integrate with real auth)
// ========================================

// Temporary mock users (replace with database)
const MOCK_USERS = [
    {
        id: '1',
        email: 'membro@algor.com.br',
        password: 'algor2026', // In production, use bcrypt hash
        name: 'Paulo Carvalho',
        role: 'Membro Associado',
        avatar: '/images/membro_01_paulo_carvalho.webp'
    },
    {
        id: '2',
        email: 'admin@algor.com.br',
        password: 'admin2026',
        name: 'Admin ALGOR',
        role: 'Administrador',
        avatar: '/logo-algor.webp'
    }
];

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: 'E-mail e senha são obrigatórios' },
                { status: 400 }
            );
        }

        // Find user (in production, query database)
        const user = MOCK_USERS.find(
            u => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!user || user.password !== password) {
            return NextResponse.json(
                { error: 'E-mail ou senha incorretos' },
                { status: 401 }
            );
        }

        // Check if user is a member
        if (user.role !== 'Membro Associado' && user.role !== 'Administrador') {
            return NextResponse.json(
                { error: 'Acesso restrito a Membros Associados' },
                { status: 403 }
            );
        }

        // Generate token (simplified - in production, use JWT)
        const token = Buffer.from(JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
        })).toString('base64');

        // Create response
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                avatar: user.avatar
            }
        });

        // Set cookie
        response.cookies.set('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/'
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Erro ao fazer login' },
            { status: 500 }
        );
    }
}
