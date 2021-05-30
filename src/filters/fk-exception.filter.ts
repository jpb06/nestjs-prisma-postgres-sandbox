import { Response } from 'express';

import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ForeignKeyExceptionFilter extends BaseExceptionFilter {
  catch(exception: { message: string }, host: ArgumentsHost) {
    const match = /Foreign key constraint failed on the field: `(.+)`$/gm.exec(
      exception.message,
    );

    if (!match || !match[1]) {
      return super.catch(exception, host);
    }

    const keywords = match[1].split(' ')[0].split('_');
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
