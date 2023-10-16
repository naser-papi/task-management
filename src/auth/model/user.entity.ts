import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { TaskEntity } from "../../tasks/model";

@Entity()
@Unique(["username"])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  salt: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
