import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from "./dto";
import { TaskStatus } from "./model";
import { StatusValidationPipe } from "./pipe";
import { GetUser } from "../auth/get-user.decorator";
import { UserEntity } from "../auth/model";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskSrv: TasksService) {}

  @Get()
  GetTasks(
    @Query(ValidationPipe) dto: FilterTaskDto,
    @GetUser() user: UserEntity,
  ) {
    if (Object.keys(dto).length) {
      return this.taskSrv.FilterTasks(dto, user);
    }
    return this.taskSrv.GetAll(user);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  AddTask(@Body() dto: CreateTaskDto, @GetUser() user: UserEntity) {
    return this.taskSrv.AddTask(dto, user);
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
    @Body("status", StatusValidationPipe) status: TaskStatus,
  ) {
    return this.taskSrv.UpdateTaskStatus(id, status);
  }
}
