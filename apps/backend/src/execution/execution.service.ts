import { Injectable } from '@nestjs/common';
import { Run } from '../generated/prisma/client';
import { RunsService } from '../runs/runs.service';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as os from 'node:os';
import { ScriptWithConfigDependenciesAndConfigItem } from '../scripts/scripts.types';
import { DockerService } from '../docker/docker.service';

const SCRIPT_FILE_NAME = 'script.js';
const INPUT_FILE_NAME = 'input.json';
const RESULT_MARKER = '__SCRIPTHUB_RESULT__';
const CONTAINER_TIMEOUT_MS = 5 * 60 * 1000;

@Injectable()
export class ExecutionService {
    constructor(
        private readonly dockerService: DockerService,
        private readonly runsService: RunsService,
    ) {}

    async executeScript(
        script: ScriptWithConfigDependenciesAndConfigItem,
        run: Run,
    ): Promise<void> {
        let isSuccess = false;

        try {
            const runDirectory = await this.prepareRunDirectory(script, run);

            await this.runsService.updateRunStatus(run.id, 'running');
            isSuccess = await this.dockerService.runContainer(
                runDirectory,
                SCRIPT_FILE_NAME,
                CONTAINER_TIMEOUT_MS,
                (message: string) => this.runsService.writeRunLog(run.id, 'stdout', message),
                (message: string) => this.runsService.writeRunLog(run.id, 'stderr', message),
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Execution failed';
            this.runsService.writeRunLog(run.id, 'stderr', message);
        }

        await this.runsService.updateRunStatus(run.id, isSuccess ? 'succeeded' : 'failed');
    }

    private async prepareRunDirectory(
        script: ScriptWithConfigDependenciesAndConfigItem,
        run: Run,
    ): Promise<string> {
        const runDirectory = path.join(os.tmpdir(), 'scripthub', run.id);
        await fs.mkdir(runDirectory, { recursive: true });
        await fs.writeFile(
            path.join(runDirectory, INPUT_FILE_NAME),
            JSON.stringify({
                params: run.params,
                config: Object.fromEntries(
                    script.configDependencies.map(({ configItem }) => [
                        configItem.name,
                        configItem.code,
                    ]),
                ),
            }),
        );
        await fs.writeFile(
            path.join(runDirectory, SCRIPT_FILE_NAME),
            this.getRuntimeCode(script.code),
        );

        return runDirectory;
    }

    private getRuntimeCode(scriptCode: string): string {
        return `
async function main() {
    const { params, config } = JSON.parse(require('fs').readFileSync('/app/${INPUT_FILE_NAME}', 'utf8'));

    const userScript = async (config, params) => {
        ${scriptCode}
    };

    const result = await userScript(config, params);
    console.log('${RESULT_MARKER}' + JSON.stringify(result));
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
`;
    }
}
