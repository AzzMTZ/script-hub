import { Module } from '@nestjs/common';
import { ScriptsController } from './scripts.controller';
import { ScriptsService } from './scripts.service';
import { RunsModule } from '../runs/runs.module';

@Module({
    imports: [RunsModule],
    controllers: [ScriptsController],
    providers: [ScriptsService],
    exports: [ScriptsService],
})
export class ScriptsModule {}
