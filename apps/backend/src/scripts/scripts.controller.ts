import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ScriptsService } from './scripts.service';
import { Script } from '../generated/prisma/client';
import { CreateScriptDto } from './dto/create-script.dto';

@Controller('scripts')
export class ScriptsController {
    constructor(private readonly scriptsService: ScriptsService) {}

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Script | null> {
        return this.scriptsService.getScript(id);
    }

    @Post()
    @ApiBody({ type: CreateScriptDto })
    create(@Body() body: CreateScriptDto): Promise<Script> {
        return this.scriptsService.createScript(body);
    }
}
