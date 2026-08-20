import { createContext } from 'react';
import type { User } from '@script-hub/types';

export type AuthContextValue = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    signOut: () => {},
});
