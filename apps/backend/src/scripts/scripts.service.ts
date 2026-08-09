import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Script } from '../generated/prisma/client';
import type { CreateScriptDto } from '@script-hub/types';

@Injectable()
export class ScriptsService {
    constructor(private prisma: PrismaService) {}

    getScript(id: string): Promise<Script | null> {
        return this.prisma.script.findUnique({
            where: {
                id,
            },
        });
    }

    createScript({
        code,
        creatorId,
        description,
        name,
        paramsSchema,
    }: CreateScriptDto): Promise<Script> {
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
