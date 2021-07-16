import { ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { BaseExceptionFilter } from '@nestjs/core';
import { mockDeep } from 'jest-mock-extended';

import { ForeignKeyDeletionExceptionFilter } from './fk-deletion-exception.filter';

jest.mock('@nestjs/core');

describe('ForeignKeyDeletionExceptionFilter filter', () => {
  const argumentsHostMock = mockDeep<ArgumentsHost>();

  beforeEach(() => jest.clearAllMocks());

  it('should call base exception catch function if the error is unrelated', () => {
    const exception = new InternalServerErrorException();

    const filter = new ForeignKeyDeletionExceptionFilter();
    filter.catch(exception, argumentsHostMock);

    expect(BaseExceptionFilter).toHaveBeenCalledTimes(1);
  });

  it('should reply with a bad request response', () => {
    const exception = {
      message: 'Oh no!',
      meta: {
        relation_name: 'coolbro',
        model_a_name: 'cool',
        model_b_name: 'bro',
      },
      code: 'P2014',
    };
    const statusMock = jest.fn().mockReturnThis();
    const jsonMock = jest.fn();
    argumentsHostMock.switchToHttp.mockReturnValue({
      getResponse: jest.fn().mockReturnValueOnce({
        status: statusMock,
        json: jsonMock,
      }),
    } as unknown as HttpArgumentsHost);

    const filter = new ForeignKeyDeletionExceptionFilter();
    filter.catch(exception, argumentsHostMock);

    expect(statusMock).toHaveBeenCalledTimes(1);
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(jsonMock).toHaveBeenCalledWith({
      statusCode: 400,
      message: [`Unable to delete this entry: coolbro relation violation.`],
      error: 'Foreign key constraint violation',
    });
  });
});
