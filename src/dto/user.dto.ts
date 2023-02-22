/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  fullName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  age: string;
  country: string;
  isAdmin: boolean;
}
