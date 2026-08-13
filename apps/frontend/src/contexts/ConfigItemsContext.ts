import { createContext } from 'react';
import type { ConfigItem } from '@script-hub/types';

export type ConfigItemsContextValue = {
    configItems: ConfigItem[];
};

export const ConfigItemsContext = createContext<ConfigItemsContextValue>({ configItems: [] });
