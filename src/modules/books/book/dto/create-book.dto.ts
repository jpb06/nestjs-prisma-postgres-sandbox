import { IsInt, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  @IsInt()
  idAuthor: number;

  @ApiProperty()
  @IsInt()
  idCategory: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: Number, description: 'The year of publication' })
  @IsOptional()
  @IsInt()
  publicationDate: number | null;
}
