import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class RunScriptDto {
    @ApiProperty()
    @IsObject()
    params!: Record<string, unknown>;
}
