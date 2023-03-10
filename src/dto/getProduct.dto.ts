/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @IsString()
  readonly pageSize: number;
  readonly pageNumber: number;
  readonly keyword: any;
  readonly sortBy: any;
  readonly category: any;
}
