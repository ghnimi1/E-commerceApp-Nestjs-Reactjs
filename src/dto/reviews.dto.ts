/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class ReviewsDto {
  @IsNotEmpty()
  rating: number;
  @IsNotEmpty()
  comment: string;
}
