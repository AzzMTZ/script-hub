import { Injectable } from '@nestjs/common';
import { Prisma, Run, RunStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateRunRequest } from '@script-hub/types';

@Injectable()
export class RunsService {
    constructor(private prisma: PrismaService) {}

    getRunById(id: string): Promise<Run | null> {
        return this.prisma.run.findUnique({
            where: {
                id,
            },
        });
    }

    getRuns(): Promise<Run[]> {
        return this.prisma.run.findMany();
    }

    createRun({ executorId, params, scriptId, status }: CreateRunRequest): Promise<Run> {
        return this.prisma.run.create({
            data: {
                executorId,
                params: params as Prisma.InputJsonObject,
                scriptId,
                status: status ?? RunStatus.pending,
            },
        });
    }

    deleteRun(id: string): Promise<Run> {
        return this.prisma.run.delete({
            where: {
                id,
            },
        });
    }

    updateRunStatus(id: string, status: RunStatus): Promise<Run> {
        return this.prisma.run.update({
            where: {
                id,
            },
            data: {
                status,
                updatedAt: new Date(),
            },
        });
    }

    editRun(id: string, { executorId, params, scriptId, status }: CreateRunRequest): Promise<Run> {
        return this.prisma.run.update({
            where: {
                id,
            },
            data: {
                executorId,
                params: params as Prisma.InputJsonObject,
                scriptId,
                ...(status ? { status } : {}),
            },
        });
    }
}
