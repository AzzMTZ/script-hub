import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateConfigItemRequest } from '@script-hub/types';

export class CreateConfigItemDto implements CreateConfigItemRequest {
    @ApiProperty()
    @IsString()
    creatorId!: string;

    @ApiProperty({ type: Object, additionalProperties: true })
    @IsNotEmpty()
    code!: unknown;

    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsString()
    description!: string;
}
