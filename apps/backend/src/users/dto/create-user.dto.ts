import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { AuthProvider, UserRole } from '../../generated/prisma/client';
import { CreateUserRequest } from '@script-hub/types';

export class CreateUserDto implements CreateUserRequest {
    @ApiProperty()
    @IsString()
    authProviderId!: string;

    @ApiProperty({ enum: AuthProvider })
    @IsEnum(AuthProvider)
    authProvider!: AuthProvider;

    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty({ enum: UserRole })
    @IsEnum(UserRole)
    role!: UserRole;

    @ApiProperty()
    @IsEmail()
    email!: string;
}
