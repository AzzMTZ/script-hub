import type { User } from '@script-hub/types';
import axios from 'axios';

const DEFAULT_API_BASE_URL = 'http://localhost:3000';
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, '');

export async function fetchCurrentUser(): Promise<User | null> {
    try {
        const response = await axios.get<User>(`${apiBaseUrl}/auth/me`, { withCredentials: true });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            return null;
        }

        throw error;
    }
}

export async function logout(): Promise<void> {
    await axios.post(`${apiBaseUrl}/auth/logout`, undefined, { withCredentials: true });
}

export function getGoogleSignInUrl(): string {
    return `${apiBaseUrl}/auth/google`;
}
