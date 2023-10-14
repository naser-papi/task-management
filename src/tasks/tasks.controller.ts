import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from "./dto";
import { TaskSatus } from "./model";
import { StatusValidationPipe } from "./pipe";

@Controller("tasks")
export class TasksController {
  constructor(private taskSrv: TasksService) {}

  @Get()
  GetTasks(@Query(ValidationPipe) dto: FilterTaskDto) {
    if (Object.keys(dto).length) {
      return this.taskSrv.FilterTasks(dto);
    }
    return this.taskSrv.GetAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  AddTask(@Body() dto: CreateTaskDto) {
    return this.taskSrv.AddTask(dto);
  }

  @Delete("/:id")
  RemoveTask(@Param("id") id: string) {
    return this.taskSrv.RemoveTask(id);
  }

  @Get("/:id")
  GetTask(@Param("id") id: string) {
    return this.taskSrv.GetById(id);
  }

  @Patch("/:id")
  UpdateTask(@Param("id") id: string, @Body() dto: UpdateTaskDto) {
    return this.taskSrv.UpdateTask(id, dto);
  }

  @Patch("/:id/status")
  UpdateStatus(
    @Param("id") id: string,
    @Body("status", StatusValidationPipe) status: TaskSatus,
  ) {
    return this.taskSrv.UpdateTaskStatus(id, status);
  }
}
