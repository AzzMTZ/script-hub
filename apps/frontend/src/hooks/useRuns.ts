import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchRuns } from '../apis/runsApi';

export const useRunsQuery = () => {
    return useQuery(
        queryOptions({
            queryKey: ['runs'],
            queryFn: fetchRuns,
        }),
    );
};
