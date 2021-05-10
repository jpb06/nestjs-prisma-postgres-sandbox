import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  role: string;
}
