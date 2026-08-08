import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ScriptsService } from './scripts.service';

@Controller('scripts')
export class ScriptsController {
    constructor(private readonly scriptsService: ScriptsService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.scriptsService.findOne(id);
    }

    @Post()
    create(@Body() body: unknown) {
        return this.scriptsService.findOne(String(body));
    }
}
