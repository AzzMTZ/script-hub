import { Module } from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { ExecutionController } from './execution.controller';
import { DockerModule } from '../docker/docker.module';
import { ScriptsModule } from '../scripts/scripts.module';
import { RunsModule } from '../runs/runs.module';

@Module({
    imports: [DockerModule, ScriptsModule, RunsModule],
    controllers: [ExecutionController],
    providers: [ExecutionService],
})
export class ExecutionModule {}
