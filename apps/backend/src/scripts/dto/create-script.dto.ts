import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateScriptParamSchemaDto {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    type!: string;
}

export class CreateScriptDto {
    @ApiProperty()
    @IsString()
    creatorId!: string;

    @ApiProperty()
    @IsString()
    code!: string;

    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsString()
    description!: string;

    @ApiProperty({ type: CreateScriptParamSchemaDto, isArray: true })
    paramsSchema!: CreateScriptParamSchemaDto[];
}
