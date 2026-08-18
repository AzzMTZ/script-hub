import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchConfigItems } from '../apis/configItemsApi';

export const useConfigItemsQuery = () => {
    return useQuery(
        queryOptions({
            queryKey: ['configItems'],
            queryFn: fetchConfigItems,
        }),
    );
};
