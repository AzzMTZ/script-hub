import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ScriptsModule } from './scripts/scripts.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RunsModule } from './runs/runs.module';

@Module({
    imports: [ConfigModule.forRoot(), PrismaModule, ScriptsModule, UsersModule, RunsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
