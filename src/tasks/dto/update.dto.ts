import { TaskStatus } from "../model";

export class UpdateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}
