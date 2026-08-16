import { Module } from '@nestjs/common';
import { RunsController } from './runs.controller';
import { RunsService } from './runs.service';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';

@Module({
    imports: [ElasticsearchModule],
    controllers: [RunsController],
    providers: [RunsService],
    exports: [RunsService],
})
export class RunsModule {}
