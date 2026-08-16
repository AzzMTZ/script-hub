import { Controller, Post, Param, Body, Headers } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Run } from '../generated/prisma/client';
import { RunsService } from '../runs/runs.service';
import { RunScriptDto } from './dto/run-script.dto';
import { ScriptsService } from '../scripts/scripts.service';
import { ExecutionService } from './execution.service';

@Controller('execution')
export class ExecutionController {
    constructor(
        private readonly scriptsService: ScriptsService,
        private readonly runsService: RunsService,
        private readonly executionService: ExecutionService,
    ) {}

    @Post(':id/run')
    @ApiBody({ type: RunScriptDto })
    async runScript(
        @Headers('user-id') userId: string,
        @Param('id') id: string,
        @Body() body: RunScriptDto,
    ): Promise<Run> {
        const script = await this.scriptsService.getScriptById(id);

        if (!script) {
            throw new Error(`Script with id ${id} not found`);
        }

        const run = await this.runsService.createRun({
            executorId: userId,
            params: body.params,
            scriptId: id,
            status: 'pending',
        });

        void this.executionService.executeScript(script, run);

        return run;
    }
}
