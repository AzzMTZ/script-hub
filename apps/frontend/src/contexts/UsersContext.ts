import { createContext } from 'react';
import type { User } from '@script-hub/types';

export type UsersContextValue = {
    users: User[];
};

export const UsersContext = createContext<UsersContextValue>({ users: [] });
