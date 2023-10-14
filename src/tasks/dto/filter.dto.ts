import { TaskSatus } from "../tasks.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class FilterTaskDto {
  @IsOptional()
  @IsIn([TaskSatus.TODO, TaskSatus.DONE, TaskSatus.DONE])
  status: TaskSatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
