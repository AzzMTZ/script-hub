import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ConfigItem } from '../generated/prisma/client';
import { CreateConfigItemDto } from './dto/create-config-item.dto';
import { ConfigItemsService } from './config-items.service';

@Controller('config-items')
export class ConfigItemsController {
    constructor(private readonly configItemsService: ConfigItemsService) {}

    @Get(':id')
    getConfigItemById(@Param('id') id: string): Promise<ConfigItem | null> {
        return this.configItemsService.getConfigItemById(id);
    }

    @Get()
    getConfigItems(): Promise<ConfigItem[]> {
        return this.configItemsService.getConfigItems();
    }

    @Post()
    @ApiBody({ type: CreateConfigItemDto })
    create(@Body() body: CreateConfigItemDto): Promise<ConfigItem> {
        return this.configItemsService.createConfigItem(body);
    }

    @Put(':id')
    @ApiBody({ type: CreateConfigItemDto })
    edit(@Param('id') id: string, @Body() body: CreateConfigItemDto): Promise<ConfigItem> {
        return this.configItemsService.editConfigItem(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<ConfigItem> {
        return this.configItemsService.deleteConfigItem(id);
    }
}
