import { createContext } from 'react';
import type { Script } from '@script-hub/types';

export type ScriptsContextValue = {
    scripts: Script[];
};

export const ScriptsContext = createContext<ScriptsContextValue>({ scripts: [] });
