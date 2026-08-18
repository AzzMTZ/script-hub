import { Injectable } from '@nestjs/common';
import { User } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateUserRequest } from '@script-hub/types';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    getUserById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    createUser({
        authProvider,
        authProviderId,
        email,
        name,
        role,
    }: CreateUserRequest): Promise<User> {
        return this.prisma.user.create({
            data: {
                authProvider,
                authProviderId,
                email,
                name,
                role,
            },
        });
    }

    deleteUser(id: string): Promise<User> {
        return this.prisma.user.delete({
            where: {
                id,
            },
        });
    }

    editUser(
        id: string,
        { authProvider, authProviderId, email, name, role }: CreateUserRequest,
    ): Promise<User> {
        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                authProvider,
                authProviderId,
                email,
                name,
                role,
            },
        });
    }
}
