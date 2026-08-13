import type { Run } from '@script-hub/types';

// TODO: replace with real logs once a run logs API exists.
export const buildDummyLogs = (run: Run, scriptName?: string, executorName?: string): string[] => {
    const startedAt = new Date(run.startedAt).toLocaleTimeString();
    const name = scriptName ?? run.scriptId;

    const lines = [
        `[${startedAt}] Starting run of "${name}"...`,
        `[${startedAt}] Executor: ${executorName ?? run.executorId}`,
        `[${startedAt}] Resolving dependencies...`,
        `[${startedAt}] Dependencies resolved.`,
        `[${startedAt}] Executing script...`,
        '',
        '> node script.js',
        '',
        'Initializing environment...      \x1b[32mOK\x1b[0m',
        'Loading configuration...         \x1b[32mOK\x1b[0m',
        'Connecting to service...         \x1b[32mOK\x1b[0m',
        'Running task 1/3: fetch-data...      \x1b[32mdone\x1b[0m',
        'Running task 2/3: transform-data...  \x1b[32mdone\x1b[0m',
        'Running task 3/3: upload-results...  \x1b[32mdone\x1b[0m',
        '',
    ];

    if (run.status === 'failed') {
        lines.push('\x1b[31mError: Task failed with exit code 1\x1b[0m');
        lines.push('    at Object.<anonymous> (/app/script.js:42:11)');
    } else if (run.status === 'running' || run.status === 'pending') {
        lines.push('\x1b[36mRun in progress...\x1b[0m');
    } else {
        const finishedAt = run.finishedAt ? new Date(run.finishedAt).toLocaleTimeString() : startedAt;
        lines.push(`[${finishedAt}] \x1b[32mRun completed successfully.\x1b[0m`);
    }

    return lines;
};
