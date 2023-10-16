import { TaskStatus } from "../model";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class FilterTaskDto {
  @IsOptional()
  @IsIn([TaskStatus.TODO, TaskStatus.DONE, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
