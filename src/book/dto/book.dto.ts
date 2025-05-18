import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Categories } from '@prisma/client';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  descriptin: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsEnum(Categories, {
    message: 'Category must be one of ADVENTURE, CLASSICS, CRIME, FANTASY',
  })
  category: Categories;
}


export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  descriptin?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsEnum(Categories, {
    message: 'Category must be one of ADVENTURE, CLASSICS, CRIME, FANTASY',
  })
  category?: Categories;
}

