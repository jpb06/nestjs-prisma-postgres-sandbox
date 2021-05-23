import { IsInt } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { NewBookDto } from './newbook.dto';

export class BookDto extends NewBookDto {
  @ApiProperty()
  @IsInt()
  id: number;
}
