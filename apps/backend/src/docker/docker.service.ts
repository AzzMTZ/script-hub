import { Injectable } from '@nestjs/common';
import { PassThrough } from 'node:stream';
import { finished } from 'node:stream/promises';
import * as fs from 'node:fs/promises';
import Docker from 'dockerode';

const RUNTIME_IMAGE = 'node:24-alpine';
const CONTAINER_MEMORY_BYTES = 256 * 1024 * 1024;
const CONTAINER_NANO_CPUS = 1_000_000_000;
const CONTAINER_PIDS_LIMIT = 128;

const isImageNotFoundError = (error: unknown): boolean => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'statusCode' in error &&
        error.statusCode === 404
    );
};

interface ContainerWaitResult {
    StatusCode: number;
}

@Injectable()
export class DockerService {
    private readonly docker = new Docker();

    async runContainer(
        runDirectory: string,
        fileName: string,
        timeoutMs: number,
        onOutput: (line: string) => void,
        onError: (line: string) => void,
    ): Promise<boolean> {
        let container: Docker.Container | undefined;
        try {
            container = await this.createContainer(runDirectory, fileName);
            await this.attachOutput(container, onOutput, onError);
            await container.start();
            const { StatusCode } = await this.waitForExit(container, timeoutMs);
            return StatusCode === 0;
        } catch (error) {
            if (container) {
                await container.remove({ force: true });
            }
            throw error;
        } finally {
            await fs.rm(runDirectory, { recursive: true, force: true });
        }
    }

    private async waitForExit(
        container: Docker.Container,
        timeoutMs: number,
    ): Promise<ContainerWaitResult> {
        let timer!: NodeJS.Timeout;
        const timeout = new Promise<never>((_, reject) => {
            timer = setTimeout(
                () => reject(new Error(`Container execution timed out after ${timeoutMs}ms`)),
                timeoutMs,
            );
        });

        try {
            return (await Promise.race([container.wait(), timeout])) as ContainerWaitResult;
        } finally {
            clearTimeout(timer);
        }
    }

    private async createContainer(
        runDirectory: string,
        fileName: string,
    ): Promise<Docker.Container> {
        await this.ensureImage(RUNTIME_IMAGE);

        const container = await this.docker.createContainer({
            Image: RUNTIME_IMAGE,
            Cmd: ['node', fileName],
            WorkingDir: '/app',
            AttachStdout: true,
            AttachStderr: true,
            HostConfig: {
                Binds: [`${runDirectory}:/app:ro`],
                AutoRemove: true,
                NetworkMode: 'none',
                ReadonlyRootfs: true,
                Tmpfs: { '/tmp': 'rw,noexec,nosuid,size=64m' },
                CapDrop: ['ALL'],
                SecurityOpt: ['no-new-privileges'],
                Memory: CONTAINER_MEMORY_BYTES,
                MemorySwap: CONTAINER_MEMORY_BYTES,
                NanoCpus: CONTAINER_NANO_CPUS,
                PidsLimit: CONTAINER_PIDS_LIMIT,
            },
        });

        return container;
    }

    private async attachOutput(
        container: Docker.Container,
        onOutput: (line: string) => void,
        onError: (line: string) => void,
    ): Promise<void> {
        const stream = await container.attach({ stream: true, stdout: true, stderr: true });

        const stdout = new PassThrough();
        const stderr = new PassThrough();

        stdout.on('data', (chunk: Buffer) => {
            const line = chunk.toString().trimEnd();
            onOutput(line);
        });
        stderr.on('data', (chunk: Buffer) => {
            const line = chunk.toString().trimEnd();
            onError(line);
        });

        const modem = container.modem as {
            demuxStream(
                stream: NodeJS.ReadableStream,
                stdout: NodeJS.WritableStream,
                stderr: NodeJS.WritableStream,
            ): void;
        };
        modem.demuxStream(stream, stdout, stderr);
    }

    private async ensureImage(image: string): Promise<void> {
        try {
            await this.docker.getImage(image).inspect();
            return;
        } catch (error) {
            if (!isImageNotFoundError(error)) {
                throw error;
            }
        }

        const pullStream = await this.docker.pull(image);
        await finished(pullStream);
    }
}
