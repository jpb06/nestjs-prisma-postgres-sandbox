import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string | null;

  @ApiProperty()
  lastName: string | null;

  @ApiProperty()
  token: string;

  @ApiProperty()
  role: string;
}
