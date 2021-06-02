import { Response } from 'express';

import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaException } from '@owntypes/prisma-exception.interface';

@Catch()
export class ForeignKeyExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaException<string>, host: ArgumentsHost) {
    if (exception.code !== 'P2003') {
      return super.catch(exception, host);
    }

    const keywords = exception?.meta?.split(' ')[0].split('_') || [];
    if (keywords.length !== 3 || keywords[2] !== 'fkey') {
      return super.catch(exception, host);
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(400).json({
      statusCode: 400,
      message: [`Invalid value for ${keywords[0]}.${keywords[1]}`],
      error: 'Foreign key constraint violation',
    });
  }
}
