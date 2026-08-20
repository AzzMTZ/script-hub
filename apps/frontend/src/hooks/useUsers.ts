import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../apis/usersApi';

export const useUsersQuery = (enabled = true) => {
    return useQuery(
        queryOptions({
            queryKey: ['users'],
            queryFn: fetchUsers,
            enabled,
        }),
    );
};
