import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty()
  @IsString()
  name: string;
}
