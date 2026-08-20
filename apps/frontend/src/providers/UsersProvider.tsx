import { useContext, type ReactNode } from 'react';
import { UsersContext } from '../contexts/UsersContext';
import { AuthContext } from '../contexts/AuthContext';
import { useUsersQuery } from '../hooks/useUsers';

export const UsersProvider = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const usersQuery = useUsersQuery(isAuthenticated);

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
