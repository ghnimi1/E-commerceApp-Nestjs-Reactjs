/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  fullName: string;
  age: string;
  country: string;
}
