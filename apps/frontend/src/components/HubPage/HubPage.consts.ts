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

export const tabs: { key: ScriptsTabKey; path: string; label: string }[] = [
    { key: 'scripts', path: '/scripts', label: 'Scripts' },
    { key: 'config', path: '/config', label: 'Config' },
    { key: 'runs', path: '/runs', label: 'Runs' },
];
