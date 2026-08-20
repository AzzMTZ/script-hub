import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConfigItemsModule } from './config-items/config-items.module';
import { PrismaModule } from './prisma/prisma.module';
import { RunsModule } from './runs/runs.module';
import { ScriptsModule } from './scripts/scripts.module';
import { UsersModule } from './users/users.module';
import { ExecutionModule } from './execution/execution.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        AuthModule,
        ScriptsModule,
        ConfigItemsModule,
        UsersModule,
        RunsModule,
        ExecutionModule,
    ],
    controllers: [AppController],
    providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
