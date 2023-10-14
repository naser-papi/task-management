import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskSatus } from "../tasks.model";
export class StatusValidationPipe implements PipeTransform {
  readonly validValues = [TaskSatus.TODO, TaskSatus.DOING, TaskSatus.DOING];
  transform(value: any): TaskSatus {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException("invalid status");
    }
    return value;
  }
  isStatusValid(status: string) {
    status = status.toUpperCase();
    return this.validValues.includes(status as TaskSatus);
  }
}
