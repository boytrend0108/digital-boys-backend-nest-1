import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    { id: 1, title: 'Sample Task', isCompleted: false },
    { id: 2, title: 'Another Task', isCompleted: true },
  ];

  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  create(dto: CreateTaskDto) {
    const { title } = dto;

    const newTask = { id: Date.now(), title, isCompleted: false };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, dto: UpdateTaskDto) {
    const { title, isCompleted } = dto;
    const task = this.findById(id);
    task.title = title;
    task.isCompleted = isCompleted;
    return task;
  }

  updatePatch(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);
    Object.assign(task, dto);
    return task;
  }

  delete(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.tasks.splice(index, 1);
    return { message: `Task with ID ${id} deleted successfully` };
  }
}
