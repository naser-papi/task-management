import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../../auth/model";

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;

  @Column()
  userId: number;
}

export enum TaskStatus {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}
