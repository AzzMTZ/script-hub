import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { User } from '../generated/prisma/client';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    getUserById(@Param('id') id: string): Promise<User | null> {
        return this.usersService.getUserById(id);
    }

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Post()
    @ApiBody({ type: CreateUserDto })
    create(@Body() body: CreateUserDto): Promise<User> {
        return this.usersService.createUser(body);
    }

    @Put(':id')
    @ApiBody({ type: CreateUserDto })
    edit(@Param('id') id: string, @Body() body: CreateUserDto): Promise<User> {
        return this.usersService.editUser(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<User> {
        return this.usersService.deleteUser(id);
    }
}
