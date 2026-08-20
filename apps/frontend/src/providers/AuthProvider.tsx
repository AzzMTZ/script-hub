import { useMemo, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../contexts/AuthContext';
import { useCurrentUserQuery } from '../hooks/useAuth';
import { logout } from '../apis/authApi';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const currentUserQuery = useCurrentUserQuery();
    const queryClient = useQueryClient();

    const authValue = useMemo(
        () => ({
            user: currentUserQuery.data ?? null,
            isAuthenticated: Boolean(currentUserQuery.data),
            isLoading: currentUserQuery.isLoading,
            signOut: () => {
                void logout().finally(() => {
                    queryClient.setQueryData(['auth', 'me'], null);
                });
            },
        }),
        [currentUserQuery.data, currentUserQuery.isLoading, queryClient],
    );

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};
