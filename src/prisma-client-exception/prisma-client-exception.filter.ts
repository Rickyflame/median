import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

//ensure the filter catches the exceptions of type prismaclient
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  // ensure the filter extands the BaseExceptionfilter class
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    // Add a console error to log the error message to the log
    /*
    @Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter implements ExceptionFilter {
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.name === 'NotFoundError' ? 404 : 500;

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: this.getMessage(exception),
        });
    }

    private getMessage(
        exception: Prisma.PrismaClientKnownRequestError,
    ): string {
        // // The .code property can be accessed in a type-safe manner
        // if (exception.code === 'P2002') {
        //     console.log(
        //         'There is a unique constraint violation, a new user cannot be created with this email',
        //     );
        // }
        return exception.message;
    }
}
    */
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');
    const status = exception.name === ' NotFoundError' ? 404 : 500;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      default:
        // default 500 errorcode
        super.catch(exception, host);
        break;
    }
  }
}
