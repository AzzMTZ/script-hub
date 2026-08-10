import type { ConfigEntry, Run, Script, ScriptsTabKey } from './HubPage.types';

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

export const scripts: Script[] = [
    { id: '1', name: 'Send Mail', description: 'A script that sends emails' },
    { id: '2', name: 'Send Mail', description: 'A script that sends emails' },
    { id: '3', name: 'Send Mail', description: 'A script that sends emails' },
    { id: '4', name: 'Send Mail', description: 'A script that sends emails' },
    { id: '5', name: 'Send Mail', description: 'A script that sends emails' },
];

export const configEntries: ConfigEntry[] = [
    {
        id: '1',
        name: 'Gmail Suffix',
        description: 'A string containing the suffix of google mail addresses',
    },
    {
        id: '2',
        name: 'Gmail Suffix',
        description: 'A string containing the suffix of google mail addresses',
    },
    {
        id: '3',
        name: 'Gmail Suffix',
        description: 'A string containing the suffix of google mail addresses',
    },
];

export const runs: Run[] = [
    { id: '1', scriptName: 'Send Mail', user: 'John Doe', timestamp: '20/02/2026, 14:00:01' },
    { id: '2', scriptName: 'Send Mail', user: 'John Doe', timestamp: '20/02/2026, 14:00:01' },
    { id: '3', scriptName: 'Send Mail', user: 'John Doe', timestamp: '20/02/2026, 14:00:01' },
];
