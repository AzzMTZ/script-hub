import type { ReactNode } from 'react';
import { ScriptsContext } from '../contexts/ScriptsContext';
import { useScriptsQuery } from '../hooks/useScripts';

export const ScriptsProvider = ({ children }: { children: ReactNode }) => {
    const scriptsQuery = useScriptsQuery();

    return (
        <ScriptsContext.Provider
            value={{
                scripts: scriptsQuery.data ?? [],
            }}
        >
            {children}
        </ScriptsContext.Provider>
    );
};
