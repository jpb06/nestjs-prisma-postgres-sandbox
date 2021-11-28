import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

import { ValidationPipe } from './validation.pipe';

class MyDto {
  @ApiProperty()
  @IsInt()
  value: number;
}

describe('Validation pipe', () => {
  const pipe = new ValidationPipe();

  it('should throw a bad request if validation failed', async () => {
    await expect(
      pipe.transform(<MyDto>{}, {
        type: 'body',
        metatype: MyDto,
        data: '',
      }),
    ).rejects.toThrow(new BadRequestException('Validation failed'));
  });

  it('should return the value if no metatype was specified', async () => {
    const object = {
      yolo: 'cool',
    };
    const result = await pipe.transform(object, {
      type: 'body',
      data: '',
    });

    expect(result).toStrictEqual(object);
  });

  it('should return the value if the is no validation errors', async () => {
    const object = {
      value: 1,
    };
    const result = await pipe.transform(object, {
      type: 'body',
      metatype: MyDto,
      data: '',
    });

    expect(result).toStrictEqual(object);
  });
});
