import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: [string];

  @ApiProperty()
  error: string;
}
