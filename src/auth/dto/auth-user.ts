import { IsEmail, IsString } from 'class-validator';

export class LoginUser {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RegisterUser {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
