import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../model";

export class StatusValidationPipe implements PipeTransform {
  readonly validValues = [TaskStatus.TODO, TaskStatus.DOING, TaskStatus.DONE];

  transform(value: any): TaskStatus {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException("invalid status");
    }
    return value;
  }
  isStatusValid(status: string) {
    status = status.toUpperCase();
    return this.validValues.includes(status as TaskStatus);
  }
}
