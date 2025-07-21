import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0, { message: 'Rating must be greater than or equal to 0' })
  @Max(5, { message: 'Rating must be less than or equal to 5' })
  rating?: number;

  @IsOptional()
  @IsString()
  image?: string;
}
