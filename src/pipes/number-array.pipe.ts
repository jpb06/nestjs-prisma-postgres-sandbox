import * as validator from 'class-validator';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class NumberArrayPipe implements PipeTransform<Array<unknown>> {
  async transform(value: Array<unknown>) {
    if (!Array.isArray(value)) {
      throw new InternalServerErrorException('Expecting an array');
    }

    const isValid = value.every((el) =>
      validator.isNumber(el, {
        allowNaN: false,
        allowInfinity: false,
      }),
    );

    if (!isValid) {
      throw new BadRequestException('Expecting an array of numbers');
    }

    return value;
  }
}
