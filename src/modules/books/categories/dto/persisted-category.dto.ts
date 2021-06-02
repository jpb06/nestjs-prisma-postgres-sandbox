import { IsDateString, IsInt } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { CreateCategoryDto } from './create-category.dto';

export class PersistedCategoryDto extends CreateCategoryDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({ type: Date })
  @IsDateString()
  createdAt: Date;
}
