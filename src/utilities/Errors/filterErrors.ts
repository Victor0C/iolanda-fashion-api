import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestWithUser } from 'src/modules/auth/Interfaces/request-with-user.interface';

@Catch()
export class FilterErrors implements ExceptionFilter {
  constructor(private readonly logger: ConsoleLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request | RequestWithUser>();

    this.logger.error(exception);
    console.error(exception);
    if ('user' in request)
      this.logger.log(
        `\x1b[33m Route accessed by the user ${request.user.sub} \x1b[33m`,
      );
    this.logger.log(`\x1b[33m${request.method} ${request.path}\x1b[33m`);
    this.logger.log(
      `\x1b[33m Body request: ${JSON.stringify(request.body)}\x1b[33m`,
    );

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: request.url,
            },
          };

    response.status(status).json(body);
  }
}
