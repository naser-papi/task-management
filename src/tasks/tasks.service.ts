import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from "./dto";
import { TaskEntity, TaskStatus } from "./model";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../auth/model";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity) private repo: Repository<TaskEntity>,
  ) {}

  GetAll(user: UserEntity) {
    return this.repo.findBy({ userId: user.id });
  }

  async AddTask({ title, description }: CreateTaskDto, user: UserEntity) {
    const newTask = this.repo.create();
    newTask.title = title;
    newTask.description = description;
    newTask.status = TaskStatus.TODO;
    newTask.user = user;
    const resp = await newTask.save();
    delete resp.user;
    return resp;
  }

  async RemoveTask(id: string) {
    // const byId = await this.GetById(id);
    // await this.repo.remove(byId);
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("invalid task id: " + id);
    }
  }

  async GetById(id: string) {
    const byId = await this.repo.findOneBy({ id });
    if (!byId) {
      throw new NotFoundException("invalid task id: " + id);
    }
    return byId;
  }

  async UpdateTask(id: string, { title, description, status }: UpdateTaskDto) {
    const byId = await this.GetById(id);
    const updated = {
      title: title ?? byId.title,
      description: description ?? byId.description,
      status: status ?? byId.status,
    };
    return this.repo.update({ id }, updated);
  }

  async UpdateTaskStatus(id: string, status: TaskStatus) {
    const byId = await this.GetById(id);
    byId.status = status;
    return await byId.save();
    //return await this.repo.update({ id }, { status });
  }

  async FilterTasks({ status, search }: FilterTaskDto, user: UserEntity) {
    const query = this.repo.createQueryBuilder();
    query.where("userId = :userId", { userId: user.id });
    if (status) {
      query.andWhere("status = :status", { status });
    }
    if (search) {
      query.andWhere("(title LIKE :search OR description LIKE :search)", {
        search: `%${search}%`,
      });
    }

    return await query.getMany();
  }
}
