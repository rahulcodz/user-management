import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dtos/create-task.dtos';
import { UpdateTaskDto } from '../dtos/update-task.dtos';

@ApiTags('tasks')
@Controller('task')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(req, createTaskDto);
  }

  @Put()
  async updateTask(@Request() req, @Body() createTaskDto: UpdateTaskDto) {
    return this.taskService.updateUser(req, createTaskDto);
  }

  @Get()
  async getTask(@Request() req) {
    return this.taskService.getTasks(req);
  }
}
