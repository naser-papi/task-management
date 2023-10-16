import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { SigninDto, SigninRespDto, SignupDto } from "./dto";
import { UserEntity } from "./model";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwtSrv: JwtService,
  ) {}

  async signUp({ fullName, password, username }: SignupDto) {
    const newUser = this.repo.create();
    const salt = await bcrypt.genSalt();
    newUser.fullName = fullName;
    newUser.password = await bcrypt.hash(password, salt);
    newUser.username = username;
    newUser.salt = salt;

    try {
      return await newUser.save();
    } catch (ex) {
      if (ex.code === "23505") {
        throw new ConflictException(ex.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn({ username, password }: SigninDto) {
    const byId = await this.repo.findOneBy({ username });
    if (byId && (await byId.validatePassword(password))) {
      const payload = { username };
      const token = this.jwtSrv.sign(payload);
      return { token } as SigninRespDto;
    }
    throw new UnauthorizedException("Invalid username or password");
  }
}
