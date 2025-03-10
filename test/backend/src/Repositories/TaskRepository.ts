import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ): Promise<Task> {
    if (!('id' in data) || data.id === null || data.id === undefined) {
      return this.prisma.task.create({
        data: data as Prisma.TaskCreateInput,
      });
    } else {
      // Mise à jour de la tâche existante
      if (typeof data.id !== 'number') {
        throw new Error('Invalid ID type');
      }
      return this.prisma.task.update({
        where: { id: data.id },
        data: data as Prisma.TaskUpdateInput,
      });
    }
  }
}
