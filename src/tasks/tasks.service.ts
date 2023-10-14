import { Injectable, NotFoundException } from "@nestjs/common";
import { ITask, TaskSatus } from "./tasks.model";
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from "./dto";

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  GetAll() {
    return this.tasks;
  }
  AddTask({ title, description }: CreateTaskDto) {
    const newTask: ITask = {
      id: new Date().getMilliseconds().toString(),
      title,
      description,
      status: TaskSatus.TODO,
    };
    this.tasks.push(newTask);
    return newTask;
  }
  RemoveTask(id: string) {
    const index = this.tasks.findIndex((x) => x.id === id);
    this.tasks.splice(index, 1);
  }
  GetById(id: string) {
    const found = this.tasks.find((r) => r.id === id);
    if (!found) {
      throw new NotFoundException("invalid task id: " + id);
    }
    return found;
  }
  UpdateTask(id: string, { title, description, status }: UpdateTaskDto) {
    const index = this.tasks.findIndex((x) => x.id === id);
    const exist = this.tasks.find((x) => x.id === id);
    const updated: ITask = {
      id,
      title: title ?? exist.title,
      description: description ?? exist.description,
      status: status ?? exist.status,
    };
    this.tasks.splice(index, 1, updated);
    return updated;
  }
  UpdateTaskStatus(id: string, status: TaskSatus) {
    const task = this.GetById(id);
    task.status = status;
    return task;
  }
  FilterTasks({ status, search }: FilterTaskDto) {
    let tasks = this.GetAll();
    if (status) {
      tasks = tasks.filter((x) => x.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }
}
