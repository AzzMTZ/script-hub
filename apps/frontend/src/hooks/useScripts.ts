import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchScripts } from '../apis/scriptsApi';

export const useScriptsQuery = () => {
    return useQuery(
        queryOptions({
            queryKey: ['scripts'],
            queryFn: fetchScripts,
        }),
    );
};
