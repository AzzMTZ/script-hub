type User = {
    id: string;
    authProviderId: string;
    authProvider: 'google' | 'github' | 'twitter';
    name: string;
    role: 'developer' | 'runner';
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

type Script = {
    id: string;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
    code: string;
    name: string;
    description: string;
    paramsSchema: Array<{
        name: string;
        type: string;
    }>;
};

type Run = {
    id: string;
    scriptId: string;
    params: Array<any>;
    result: any;
    startedAt: Date;
    finishedAt: Date;
    status: 'pending' | 'running' | 'completed' | 'failed';
    executorId: string;
};
