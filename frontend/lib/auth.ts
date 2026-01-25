import { cookies } from 'next/headers';

// ========================================
// AUTH UTILITIES
// ========================================

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar: string;
    exp: number;
}

/**
 * Get current authenticated user from cookie
 * Server-side only
 */
export async function getAuthUser(): Promise<AuthUser | null> {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            return null;
        }

        // Decode token (simplified - in production, verify JWT signature)
        const decoded = JSON.parse(
            Buffer.from(token, 'base64').toString('utf-8')
        );

        // Check if token is expired
        if (decoded.exp && decoded.exp < Date.now()) {
            return null;
        }

        return decoded as AuthUser;

    } catch (error) {
        console.error('Error getting auth user:', error);
        return null;
    }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
    const user = await getAuthUser();
    return user !== null;
}

/**
 * Check if user is a member (Membro Associado or Admin)
 */
export async function isMember(): Promise<boolean> {
    const user = await getAuthUser();
    return user !== null && (
        user.role === 'Membro Associado' ||
        user.role === 'Administrador'
    );
}

/**
 * Require authentication (throw if not authenticated)
 */
export async function requireAuth(): Promise<AuthUser> {
    const user = await getAuthUser();

    if (!user) {
        throw new Error('Authentication required');
    }

    return user;
}

/**
 * Require member role (throw if not a member)
 */
export async function requireMember(): Promise<AuthUser> {
    const user = await requireAuth();

    if (user.role !== 'Membro Associado' && user.role !== 'Administrador') {
        throw new Error('Member access required');
    }

    return user;
}
