import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AbstractController } from '../../common/controller/abstract.controller';
import { TaskService } from '../service/task.service';
import { TaskDto } from '../dto/task.dto';
import { UpdateTaskDto } from '../dto/update.task';
import { AuthGuard } from '../../user/guards/auth.guard';


@Controller('tasks')
export class TaskController extends AbstractController {
  
    constructor(private readonly taskService: TaskService) { super(); }

    @UseGuards(AuthGuard)
    @Get()
    async find(@Req() request: Request): Promise<TaskDto[] | undefined> {
        try {
            const userId = request['user'].sub;
            const result = await this.taskService.findByStatusAdnUser(request.query['status']?.toString(), userId);
            return result;
        } catch (error) {
            await this.handleException(error);
        }
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param() params: any): Promise<TaskDto | undefined> {
        try {
            const result = await this.taskService.findById(params.id);
            return result;
        } catch (error) {
            await this.handleException(error);
        }
    }

    @UseGuards(AuthGuard)
    @Post()
    async save(@Req() request: Request, @Body() dto: TaskDto): Promise<TaskDto | undefined> {
        try {  
            dto.userId = request['user'].sub;
            const result = await this.taskService.save(dto);
            return result;      
        } catch (error) {
            await this.handleException(error);
        }
    } 

    @UseGuards(AuthGuard)    
    @Patch(':id')
    async update(@Param() params: any, @Body() dto: UpdateTaskDto): Promise<TaskDto | undefined> {
        try {
            const result = await this.taskService.updateTask(params.id, dto);
            return result;      
        } catch (error) {
            await this.handleException(error);
        }
    } 

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param() params: any): Promise<void> {
        try {
            await this.taskService.removeById(params.id);
        } catch (error) {
            await this.handleException(error);
        }
    }    

}
