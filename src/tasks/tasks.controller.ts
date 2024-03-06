import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  async create(@Body() body: CreateTaskDto) {
    try {
      return await this.tasksService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task already exists');
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.tasksService.update(id, body);
  }
}
