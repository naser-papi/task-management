import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskSatus;
}

export enum TaskSatus {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}
