import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ScriptsService } from './scripts.service';
import { Script } from '../generated/prisma/client';
import { CreateScriptDto } from './dto/create-script.dto';

@Controller('scripts')
export class ScriptsController {
    constructor(private readonly scriptsService: ScriptsService) {}

    @Get(':id')
    getScriptById(@Param('id') id: string): Promise<Script | null> {
        return this.scriptsService.getScriptById(id);
    }

    @Get()
    getScripts(): Promise<Script[]> {
        return this.scriptsService.getScripts();
    }

    @Post()
    @ApiBody({ type: CreateScriptDto })
    create(@Body() body: CreateScriptDto): Promise<Script> {
        return this.scriptsService.createScript(body);
    }

    @Put(':id')
    @ApiBody({ type: CreateScriptDto })
    edit(@Param('id') id: string, @Body() body: CreateScriptDto): Promise<Script> {
        return this.scriptsService.editScript(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Script> {
        return this.scriptsService.deleteScript(id);
    }
}
