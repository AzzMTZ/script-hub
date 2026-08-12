import type { ConfigItem, Run } from '@script-hub/types';
import type { ScriptsTabKey } from './HubPage.types';

export const tabMeta: Record<ScriptsTabKey, { label: string; subtitle: string }> = {
    scripts: {
        label: 'Scripts',
        subtitle: 'Browse and run the scripts available to you',
    },
    config: {
        label: 'Config',
        subtitle: 'Manage the configuration values used by your scripts',
    },
    runs: {
        label: 'Runs',
        subtitle: 'Track the history of recent script executions',
    },
};

export const configEntries: ConfigItem[] = [
    {
        id: '1',
        name: 'Gmail Suffix',
        description: 'A string containing the suffix of google mail addresses',
        creatorId: '1',
        code: 'string',
        createdAt: new Date('2026-02-20T14:00:01'),
        updatedAt: new Date('2026-02-20T14:00:01'),
    },
    {
        id: '2',
        name: 'Gmail Suffix',
        description: 'A string containing the suffix of google mail addresses',
        creatorId: '1',
        code: 'string',
        createdAt: new Date('2026-02-20T14:00:01'),
        updatedAt: new Date('2026-02-20T14:00:01'),
    },
    {
        id: '3',
        name: 'Gmail Suffix',
        description: 'A string containing the suffix of google mail addresses',
        creatorId: '1',
        code: 'string',
        createdAt: new Date('2026-02-20T14:00:01'),
        updatedAt: new Date('2026-02-20T14:00:01'),
    },
];

export const runs: Run[] = [
    {
        id: '1',
        scriptId: 'Send Mail',
        executorId: 'John Doe',
        startedAt: new Date('2026-02-20T14:00:01'),
        params: [],
        result: undefined,
        status: 'pending',
        finishedAt: undefined,
    },
    {
        id: '2',
        scriptId: 'Send Mail',
        executorId: 'John Doe',
        startedAt: new Date('2026-02-20T14:00:01'),
        params: [],
        result: undefined,
        finishedAt: undefined,
        status: 'pending',
    },
    {
        id: '3',
        scriptId: 'Send Mail',
        executorId: 'John Doe',
        startedAt: new Date('2026-02-20T14:00:01'),
        params: [],
        result: undefined,
        finishedAt: undefined,
        status: 'pending',
    },
];
