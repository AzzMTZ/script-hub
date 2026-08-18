import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ScriptParam, CreateScriptRequest } from '@script-hub/types';

export class CreateScriptParamSchemaDto implements ScriptParam {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    type!: string;
}

export class CreateScriptDto implements CreateScriptRequest {
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

    @ApiProperty()
    @IsString()
    resultType!: string;

    @ApiProperty({ type: CreateScriptParamSchemaDto, isArray: true })
    paramsSchema!: CreateScriptParamSchemaDto[];

    @ApiProperty({ type: String, isArray: true, required: false })
    @IsOptional()
    importedConfigIds?: string[];
}
