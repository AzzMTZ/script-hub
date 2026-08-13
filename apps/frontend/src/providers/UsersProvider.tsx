import type { ReactNode } from 'react';
import { UsersContext } from '../contexts/UsersContext';
import { useUsersQuery } from '../hooks/useUsers';

export const UsersProvider = ({ children }: { children: ReactNode }) => {
    const usersQuery = useUsersQuery();

    return (
        <UsersContext.Provider
            value={{
                users: usersQuery.data ?? [],
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};
