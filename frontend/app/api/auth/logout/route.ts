import { NextResponse } from 'next/server';

// ========================================
// API: Logout
// ========================================

export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: 'Logout realizado com sucesso'
    });

    // Clear auth cookie
    response.cookies.set('access_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0, // Expire immediately
        path: '/'
    });

    return response;
}
