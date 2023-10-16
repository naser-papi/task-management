import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { SignupDto } from "../dto";

//https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99

export class UserRepository extends Repository<UserEntity> {
  async addUser({ username, password, fullName }: SignupDto) {
    const newUser = this.create();
    newUser.fullName = fullName;
    newUser.password = password;
    newUser.username = username;

    return await newUser.save();
  }
}
