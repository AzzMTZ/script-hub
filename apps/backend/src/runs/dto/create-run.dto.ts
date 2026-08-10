import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { RunStatus } from '../../generated/prisma/client';

export class CreateRunDto {
    @ApiProperty()
    @IsString()
    scriptId!: string;

    @ApiProperty()
    @IsObject()
    params!: Record<string, unknown>;

    @ApiPropertyOptional({ enum: RunStatus })
    @IsOptional()
    @IsEnum(RunStatus)
    status?: RunStatus;

    @ApiProperty()
    @IsString()
    executorId!: string;
}
