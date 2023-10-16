import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignupDto {
  @MinLength(2)
  @MaxLength(10)
  @IsString()
  username: string;
  @MaxLength(10)
  @MinLength(4)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/, {
    message: "password is week",
  })
  password: string;
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  fullName: string;
}
