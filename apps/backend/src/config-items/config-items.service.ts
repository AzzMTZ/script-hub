import { Injectable } from '@nestjs/common';
import { ConfigItem, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateConfigItemRequest } from '@script-hub/types';

@Injectable()
export class ConfigItemsService {
    constructor(private prisma: PrismaService) {}

    getConfigItemById(id: string): Promise<ConfigItem | null> {
        return this.prisma.configItem.findUnique({
            where: {
                id,
            },
        });
    }

    getConfigItems(): Promise<ConfigItem[]> {
        return this.prisma.configItem.findMany();
    }

    createConfigItem({
        code,
        creatorId,
        description,
        name,
    }: CreateConfigItemRequest): Promise<ConfigItem> {
        return this.prisma.configItem.create({
            data: {
                code: code as Prisma.InputJsonValue,
                creatorId,
                description,
                name,
            },
        });
    }

    deleteConfigItem(id: string): Promise<ConfigItem> {
        return this.prisma.configItem.delete({
            where: {
                id,
            },
        });
    }

    editConfigItem(
        id: string,
        { code, creatorId, description, name }: CreateConfigItemRequest,
    ): Promise<ConfigItem> {
        return this.prisma.configItem.update({
            where: {
                id,
            },
            data: {
                code: code as Prisma.InputJsonValue,
                creatorId,
                description,
                name,
            },
        });
    }
}
