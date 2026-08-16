import { Injectable } from '@nestjs/common';
import { Prisma, Run, RunStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateRunRequest } from '@script-hub/types';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { RunLogDocument, RunLogEntry, RunLogStream } from './runs.types';

// Matches Elasticsearch's built-in `logs-*-*` index template, so writes here
// are automatically backed by a data stream with ILM-managed rollover/retention.
const RUN_LOGS_DATA_STREAM = 'logs-scripthub.runs-default';
const MAX_RUN_LOGS = 10_000;

@Injectable()
export class RunsService {
    constructor(
        private prisma: PrismaService,
        private readonly elasticsearchService: ElasticsearchService,
    ) {}

    async readRunLogs(id: string): Promise<RunLogEntry[]> {
        const documents = await this.elasticsearchService.search<RunLogDocument>({
            index: RUN_LOGS_DATA_STREAM,
            query: {
                term: { runId: id },
            },
            sort: [{ '@timestamp': 'asc' }],
            size: MAX_RUN_LOGS,
        });

        return documents.map(({ '@timestamp': timestamp, stream, message }) => ({
            timestamp,
            stream,
            message,
        }));
    }

    writeRunLog(runId: string, stream: RunLogStream, message: string): void {
        this.elasticsearchService
            .index<RunLogDocument>({
                index: RUN_LOGS_DATA_STREAM,
                document: {
                    runId,
                    stream,
                    message,
                    '@timestamp': new Date().toISOString(),
                },
            })
            .catch((error: unknown) =>
                console.error(`[run ${runId}] failed to write run log:`, error),
            );
    }

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
