import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../apis/usersApi';

export const useUsersQuery = () => {
    return useQuery(
        queryOptions({
            queryKey: ['users'],
            queryFn: fetchUsers,
        }),
    );
};
