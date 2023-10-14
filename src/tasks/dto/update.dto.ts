import { TaskSatus } from "../model";

export class UpdateTaskDto {
  title: string;
  description: string;
  status: TaskSatus;
}
