import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Script } from '../generated/prisma/client';
import type { CreateScriptRequest } from '@script-hub/types';

@Injectable()
export class ScriptsService {
    constructor(private prisma: PrismaService) {}

    getScriptById(id: string): Promise<Script | null> {
        return this.prisma.script.findUnique({
            where: {
                id,
            },
            include: {
                configDependencies: {
                    include: {
                        configItem: true,
                    },
                },
            },
        });
    }

    getScripts(): Promise<Script[]> {
        return this.prisma.script.findMany({
            include: {
                configDependencies: {
                    include: {
                        configItem: false,
                    },
                },
            },
        });
    }

    createScript({
        code,
        creatorId,
        description,
        name,
        paramsSchema,
        resultType,
        importedConfigIds,
    }: CreateScriptRequest): Promise<Script> {
        return this.prisma.script.create({
            data: {
                code,
                creatorId,
                name,
                description,
                paramsSchema,
                resultType,
                configDependencies: {
                    create: importedConfigIds?.map((configItemId) => ({
                        configItem: {
                            connect: {
                                id: configItemId,
                            },
                        },
                    })),
                },
            },
            include: {
                configDependencies: {
                    include: {
                        configItem: true,
                    },
                },
            },
        });
    }

    deleteScript(id: string): Promise<Script> {
        return this.prisma.script.delete({
            where: {
                id,
            },
        });
    }

    editScript(
        id: string,
        { code, description, name, paramsSchema, importedConfigIds }: CreateScriptRequest,
    ): Promise<Script> {
        return this.prisma.script.update({
            where: {
                id,
            },
            data: {
                code,
                description,
                name,
                paramsSchema,
                configDependencies: {
                    create: importedConfigIds?.map((configItemId) => ({
                        configItem: {
                            connect: {
                                id: configItemId,
                            },
                        },
                    })),
                },
            },
            include: {
                configDependencies: {
                    include: {
                        configItem: true,
                    },
                },
            },
        });
    }
}
