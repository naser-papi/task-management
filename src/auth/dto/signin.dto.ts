import { IsString, MaxLength, MinLength } from "class-validator";

export class SigninDto {
  @MinLength(2)
  @MaxLength(10)
  @IsString()
  username: string;
  @MaxLength(10)
  @MinLength(4)
  password: string;
}
