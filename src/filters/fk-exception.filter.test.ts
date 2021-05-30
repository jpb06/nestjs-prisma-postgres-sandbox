import { mockDeep } from 'jest-mock-extended';

import { ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { BaseExceptionFilter } from '@nestjs/core';

import { ForeignKeyExceptionFilter } from './fk-exception.filter';

jest.mock('@nestjs/core');

describe('ForeignKeyException filter', () => {
  const argumentsHostMock = mockDeep<ArgumentsHost>();

  beforeEach(() => jest.clearAllMocks());

  it('should call base exception catch function the error is not related with fks', () => {
    const exception = new InternalServerErrorException();

    const filter = new ForeignKeyExceptionFilter();
    filter.catch(exception, argumentsHostMock);

    expect(BaseExceptionFilter).toHaveBeenCalledTimes(1);
  });

  it('should call base exception catch function when message is not relevant', () => {
    const exception = new Error(
      'Foreign key constraint failed on the field: `yolo`',
    );

    const filter = new ForeignKeyExceptionFilter();
    filter.catch(exception, argumentsHostMock);

    expect(BaseExceptionFilter).toHaveBeenCalledTimes(1);
  });

  it('should reply with a bad request response', () => {
    const exception = new Error(
      'Foreign key constraint failed on the field: `yolo_cool_fkey blabla`',
    );
    argumentsHostMock.switchToHttp.mockReturnValue({
      getResponse: jest.fn().mockReturnValueOnce({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }),
    } as unknown as HttpArgumentsHost);

    const filter = new ForeignKeyExceptionFilter();
    filter.catch(exception, argumentsHostMock);

    expect(BaseExceptionFilter).toHaveBeenCalledTimes(1);
  });
});
