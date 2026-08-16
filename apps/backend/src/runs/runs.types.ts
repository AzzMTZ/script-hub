export type RunLogStream = 'stdout' | 'stderr' | 'system';

export interface RunLogEntry {
    timestamp: string;
    stream: RunLogStream;
    message: string;
}

export interface RunLogDocument {
    runId: string;
    stream: RunLogStream;
    message: string;
    '@timestamp': string;
}
