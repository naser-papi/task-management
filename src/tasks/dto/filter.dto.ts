import { TaskSatus } from "../model";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class FilterTaskDto {
  @IsOptional()
  @IsIn([TaskSatus.TODO, TaskSatus.DONE, TaskSatus.DONE])
  status: TaskSatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
