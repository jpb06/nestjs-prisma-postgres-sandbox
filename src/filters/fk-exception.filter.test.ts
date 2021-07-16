import { ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { BaseExceptionFilter } from '@nestjs/core';
import { mockDeep } from 'jest-mock-extended';

import { ForeignKeyExceptionFilter } from './fk-exception.filter';

jest.mock('@nestjs/core');

describe('ForeignKeyException filter', () => {
  const argumentsHostMock = mockDeep<ArgumentsHost>();

  beforeEach(() => jest.clearAllMocks());

  it('should call base exception catch function if the error is unrelated', () => {
    const exception = new InternalServerErrorException();

    const filter = new ForeignKeyExceptionFilter();
    filter.catch(exception, argumentsHostMock);

    expect(BaseExceptionFilter).toHaveBeenCalledTimes(1);
  });

  it('should call base exception catch function when message is not relevant', () => {
    const exception = {
      message: 'Foreign key constraint failed on the field: `yolo`',
      code: 'P2003',
    };

    const filter = new ForeignKeyExceptionFilter();
    filter.catch(exception, argumentsHostMock);

    expect(BaseExceptionFilter).toHaveBeenCalledTimes(1);
  });

  it('should reply with a bad request response', () => {
    const exception = {
      message: 'Oh no!',
      meta: 'yolo_cool_fkey blabla',
      code: 'P2003',
    };
    const statusMock = jest.fn().mockReturnThis();
    const jsonMock = jest.fn();
    argumentsHostMock.switchToHttp.mockReturnValue({
      getResponse: jest.fn().mockReturnValueOnce({
        status: statusMock,
        json: jsonMock,
      }),
    } as unknown as HttpArgumentsHost);

    const filter = new ForeignKeyExceptionFilter();
    filter.catch(exception, argumentsHostMock);

    expect(statusMock).toHaveBeenCalledTimes(1);
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(jsonMock).toHaveBeenCalledWith({
      statusCode: 400,
      message: [`Invalid value for yolo.cool`],
      error: 'Foreign key constraint violation',
    });
  });
});
