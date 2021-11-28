import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

import { PrismaException } from '@type/prisma-exception.interface';

interface PrismaDeletionErrorMeta {
  relation_name: string;
  model_a_name: string;
  model_b_name: string;
}

@Catch()
export class ForeignKeyDeletionExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: PrismaException<PrismaDeletionErrorMeta>,
    host: ArgumentsHost,
  ): void | Response<unknown, Record<string, unknown>> {
    if (exception.code !== 'P2014') {
      return super.catch(exception, host);
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(400).json({
      statusCode: 400,
      message: [
        `Unable to delete this entry: ${exception.meta?.relation_name} relation violation.`,
      ],
      error: 'Foreign key constraint violation',
    });
  }
}
