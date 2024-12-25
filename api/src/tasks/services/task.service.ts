import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../entities/task.entity';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from '../dtos/create-task.dtos';
import { UpdateTaskDto } from '../dtos/update-task.dtos';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
  ) {}

  async createTask(req: Request, createTaskDto: CreateTaskDto) {
    try {
      const payload = {
        ...createTaskDto,
        created: (req as any)?.user?.userId,
      };

      const createdUser = new this.taskModel({
        ...payload,
      });
      await createdUser.save();
      return 'task created !!';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateUser(req: Request, updateTaskDto: UpdateTaskDto) {
    try {
      const currentTask = await this.taskModel
        .findById(String(updateTaskDto.id))
        .select('title description JotsType user')
        .exec();

      Object.assign(currentTask, updateTaskDto);
      await currentTask.save();
      return 'Details saved !!!';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getTasks(req: Request) {
    try {
      let filter: any = {};

      if ((req as any)?.user?.type === 2) {
        filter = {
          $or: [
            {
              assignedUsers: {
                $elemMatch: { email: (req as any)?.user?.email },
              },
            },
            {
              createdUser: { $elemMatch: { email: (req as any)?.user?.email } },
            },
          ],
        };
      }

      const tasks = await this.taskModel.aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: 'users', // Assuming your user collection is named 'users'
            localField: 'assigned',
            foreignField: '_id',
            as: 'assignedUsers', // Renaming for clarity in result
          },
        },
        {
          $lookup: {
            from: 'users', // Lookup for created user
            localField: 'created',
            foreignField: '_id',
            as: 'createdUser', // Renaming for clarity in result
          },
        },
        {
          $match: filter,
        },
        {
          $project: {
            title: 1,
            description: 1,
            startDate: 1,
            endDate: 1,
            assigned: {
              $map: {
                input: '$assignedUsers',
                as: 'user',
                in: '$$user._id',
              },
            },
            created: {
              $arrayElemAt: ['$createdUser._id', 0],
            },
          },
        },
      ]);

      return tasks;
    } catch (error) {}
  }
}
