import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";
import { GetUser } from "./get-user.decorator";
import { UserEntity } from "./model";

@Controller("auth")
export class AuthController {
  constructor(private authSrv: AuthService) {}

  @Post("/sign-up")
  SignUp(@Body(ValidationPipe) dto: SignupDto) {
    return this.authSrv.signUp(dto);
  }

  @Post("/sign-in")
  SignIn(@Body() dto: SigninDto) {
    return this.authSrv.signIn(dto);
  }

  @Post("/test")
  @UseGuards(AuthGuard())
  test(@GetUser() user: UserEntity) {
    console.log("user ", user);
  }
}
