import type { Prisma } from '../generated/prisma/client';

export type ScriptWithConfigDependenciesAndConfigItem = Prisma.ScriptGetPayload<{
    include: {
        configDependencies: {
            include: {
                configItem: true;
            };
        };
    };
}>;

export type ScriptWithConfigDependencies = Prisma.ScriptGetPayload<{
    include: {
        configDependencies: {
            include: {
                configItem: false;
            };
        };
    };
}>;
