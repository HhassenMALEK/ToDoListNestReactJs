import { Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    try {
      console.log('SaveTaskUseCase - Data Received:', dto);
      const data = { id: dto.id, name: dto.name };
      const result = await this.taskRepository.save(data);
      console.log('SaveTaskUseCase - Task Saved:', result);
      return result;
    } catch (error) {
      console.error('Error while saving task:', error);
      throw new BadRequestException(`Failed to save task: ${error.message}`);
    }
  }
}