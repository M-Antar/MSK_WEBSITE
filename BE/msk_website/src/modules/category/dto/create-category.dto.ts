import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;


  @IsBoolean()
  @IsOptional()
  active?: boolean;
}