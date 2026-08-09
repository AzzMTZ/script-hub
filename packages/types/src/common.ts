export type CreateScriptDto = {
    creatorId: string;
    code: string;
    name: string;
    description: string;
    paramsSchema: {
        name: string;
        type: string;
    }[];
};

export type User = {
    id: string;
    authProviderId: string;
    authProvider: 'google';
    name: string;
    role: 'developer' | 'runner';
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Script = CreateScriptDto & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Run = {
    id: string;
    scriptId: string;
    params: unknown[];
    result: unknown;
    startedAt: Date;
    finishedAt: Date;
    status: 'pending' | 'running' | 'completed' | 'failed';
    executorId: string;
};
