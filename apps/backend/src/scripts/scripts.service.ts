import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Script } from '../generated/prisma/client';

type CreateScriptInput = {
    creatorId: string;
    code: string;
    name: string;
    description: string;
    paramsSchema: Array<{
        name: string;
        type: string;
    }>;
};

@Injectable()
export class ScriptsService {
    constructor(private prisma: PrismaService) {}

    async getScripts(): Promise<Script | null> {
        return this.prisma.script.findUnique({
            where: {
                id: 'some-id',
            },
        });
    }

    async createScript({
        code,
        creatorId,
        description,
        name,
        paramsSchema,
    }: CreateScriptInput): Promise<Script> {
        return this.prisma.script.create({
            data: {
                code,
                creatorId,
                name,
                description,
                paramsSchema,
            },
        });
    }
}
