export type ScriptParam = {
    name: string;
    type: string;
};

export type CreateScriptRequest = {
    creatorId: string;
    code: string;
    name: string;
    description: string;
    paramsSchema: ScriptParam[];
    resultType?: string;
    importedConfigIds?: string[];
};

export type CreateConfigItemRequest = {
    creatorId: string;
    code: unknown;
    name: string;
    description: string;
};

export type CreateUserRequest = {
    authProviderId: string;
    authProvider: 'google';
    name: string;
    role: 'developer' | 'runner';
    email: string;
};

export type CreateRunRequest = {
    scriptId: string;
    params: Record<string, unknown>;
    status?: 'pending' | 'running' | 'succeeded' | 'failed';
    executorId: string;
};

export type IdDoc = {
    id: string;
};

export type SqlDoc = IdDoc & {
    createdAt: Date;
    updatedAt: Date;
};

export type User = CreateUserRequest & SqlDoc;

export type Script = CreateScriptRequest & SqlDoc;

export type ConfigItem = CreateConfigItemRequest & SqlDoc;

export type Run = CreateRunRequest &
    SqlDoc & {
        result: unknown;
        startedAt: Date;
        finishedAt: Date;
    };
