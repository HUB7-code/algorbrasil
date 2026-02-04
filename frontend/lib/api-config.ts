/**
 * API Configuration Utility
 * Centralizes all API endpoint configurations
 */

// Base API URL - uses environment variable or fallback to localhost
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API Endpoints
export const API_ENDPOINTS = {
    // Authentication
    auth: {
        login: `${API_BASE_URL}/api/v1/auth/login`,
        register: `${API_BASE_URL}/api/v1/auth/signup`,
        logout: `${API_BASE_URL}/api/v1/auth/logout`,
        verify: `${API_BASE_URL}/api/v1/auth/verify-email`,
        resetPassword: `${API_BASE_URL}/api/v1/auth/reset-password`,
        forgotPassword: `${API_BASE_URL}/api/v1/auth/forgot-password`,
        twoFactor: `${API_BASE_URL}/api/v1/auth/2fa`,
    },

    // User Profiles
    profiles: {
        create: `${API_BASE_URL}/api/v1/profiles`,
        get: (userId: string) => `${API_BASE_URL}/api/v1/profiles/${userId}`,
        update: (userId: string) => `${API_BASE_URL}/api/v1/profiles/${userId}`,
    },

    // LMS (Learning Management System)
    lms: {
        courses: `${API_BASE_URL}/api/lms/courses`,
        courseDetails: (courseId: string) => `${API_BASE_URL}/api/lms/courses/${courseId}`,
        updateProgress: (courseId: string) => `${API_BASE_URL}/api/lms/enrollments/${courseId}/progress`,
        certificate: (courseId: string) => `${API_BASE_URL}/api/lms/certificates/${courseId}`,
    },

    // Leads
    leads: {
        list: `${API_BASE_URL}/api/v1/leads`,
        stats: `${API_BASE_URL}/api/v1/leads/stats`,
        update: (leadId: string) => `${API_BASE_URL}/api/v1/leads/${leadId}`,
    },

    // Dashboard
    dashboard: {
        data: `${API_BASE_URL}/api/v1/dashboard`,
        risks: `${API_BASE_URL}/api/v1/risks`,
        inventory: `${API_BASE_URL}/api/v1/inventory/assets`,
    },

    // Admin
    admin: {
        users: `${API_BASE_URL}/api/v1/admin/users`,
        stats: `${API_BASE_URL}/api/v1/admin/stats`,
    },
};

/**
 * Helper function to build API URL with query parameters
 */
export function buildApiUrl(baseUrl: string, params?: Record<string, any>): string {
    if (!params) return baseUrl;

    const queryString = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Helper function to get auth headers
 */
export function getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
}
