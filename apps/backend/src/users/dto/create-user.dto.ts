import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { AuthProvider, UserRole } from '../../generated/prisma/client';

export class CreateUserDto {
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
