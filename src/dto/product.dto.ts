/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  productName: string;
  @IsNotEmpty()
  imgUrl: string;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  shortDesc: string;
  @IsNotEmpty()
  description: string;
}
