import { BadRequestException } from '@nestjs/common';

import { NumberArrayPipe } from './number-array.pipe';

describe('Validation pipe', () => {
  const pipe = new NumberArrayPipe();

  it('should throw a bad request if not given an array', async () => {
    await expect(pipe.transform(23)).rejects.toThrow(
      new BadRequestException('Expecting an array'),
    );
  });

  it('should throw a bad request if not given an array will only numbers', async () => {
    await expect(pipe.transform([1, 2, 'b'])).rejects.toThrow(
      new BadRequestException('Expecting an array of numbers'),
    );
  });

  it('should return the array if valid', async () => {
    const array = [1, 2];
    const result = await pipe.transform(array);

    expect(result).toStrictEqual(array);
  });
});
