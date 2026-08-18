import type { ReactNode } from 'react';
import { ConfigItemsContext } from '../contexts/ConfigItemsContext';
import { useConfigItemsQuery } from '../hooks/useConfigItems';

export const ConfigItemsProvider = ({ children }: { children: ReactNode }) => {
    const configItemsQuery = useConfigItemsQuery();

    return (
        <ConfigItemsContext.Provider
            value={{
                configItems: configItemsQuery.data ?? [],
            }}
        >
            {children}
        </ConfigItemsContext.Provider>
    );
};
