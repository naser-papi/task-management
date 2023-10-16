import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "./model";

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserEntity => {
    return ctx.switchToHttp().getRequest().user;
  },
);
