import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTask: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTask);
    await newTask.save();
    return newTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async delete(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }

  async update(id: string, task: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }
}
