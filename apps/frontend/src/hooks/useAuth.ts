import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../apis/authApi';

export const useCurrentUserQuery = () => {
    return useQuery(
        queryOptions({
            queryKey: ['auth', 'me'],
            queryFn: fetchCurrentUser,
            retry: false,
            staleTime: 5 * 60 * 1000,
        }),
    );
};
