import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtPayload } from "./dto";
import { UserEntity } from "./model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "test-test",
    });
  }

  async validate({ username }: JwtPayload) {
    const byId = await this.userRepo.findOneBy({ username });
    if (!byId) {
      throw new UnauthorizedException("invalid token");
    }
    return byId;
  }
}
