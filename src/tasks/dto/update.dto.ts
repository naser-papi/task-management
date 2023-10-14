import { TaskSatus } from "../tasks.model";

export class UpdateTaskDto{
  title:string;
  description:string;
  status:TaskSatus;
}