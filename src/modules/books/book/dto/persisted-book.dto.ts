import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

import { CreateBookDto } from './create-book.dto';

export class PersistedBookDto extends CreateBookDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({ type: Date })
  @IsDateString()
  createdAt: Date;
}
