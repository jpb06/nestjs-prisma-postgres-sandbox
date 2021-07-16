import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty()
  @IsString()
  name: string;
}
