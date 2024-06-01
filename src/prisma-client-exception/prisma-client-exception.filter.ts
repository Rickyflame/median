import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

// Ensure the filter catches the exceptions of type PrismaClientKnownRequestError
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  // Ensure the filter extends the BaseExceptionFilter class
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    // Add a console error to log the error message to the log
    console.error(exception.message);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.message.replace(/\n/g, '');

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'P2002': {
        status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: 'There is a unique constraint violation',
          error: message,
          path: request.url,
          timestamp: new Date().toISOString(),
        });
        break;
      }
      case 'P2025': {
        status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: 'Resource not found',
          error: message,
          path: request.url,
          timestamp: new Date().toISOString(),
        });
        break;
      }
      default:
        response.status(status).json({
          statusCode: status,
          message: 'Internal server error',
          error: message,
          path: request.url,
          timestamp: new Date().toISOString(),
        });
        break;
    }
  }
}
