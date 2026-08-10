import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Run } from '../generated/prisma/client';
import { RunsService } from './runs.service';
import { CreateRunDto } from './dto/create-run.dto';

@Controller('runs')
export class RunsController {
    constructor(private readonly runsService: RunsService) {}

    @Get(':id')
    getRunById(@Param('id') id: string): Promise<Run | null> {
        return this.runsService.getRunById(id);
    }

    @Get()
    getRuns(): Promise<Run[]> {
        return this.runsService.getRuns();
    }

    @Post()
    @ApiBody({ type: CreateRunDto })
    create(@Body() body: CreateRunDto): Promise<Run> {
        return this.runsService.createRun(body);
    }

    @Put(':id')
    @ApiBody({ type: CreateRunDto })
    edit(@Param('id') id: string, @Body() body: CreateRunDto): Promise<Run> {
        return this.runsService.editRun(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Run> {
        return this.runsService.deleteRun(id);
    }
}
