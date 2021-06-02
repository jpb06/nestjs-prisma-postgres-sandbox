import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'alice@cool.org' })
  username: string;

  @ApiProperty({ example: 'alice' })
  password: string;
}
