import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequestWithUser } from 'src/modules/auth/Interfaces/request-with-user.interface';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private readonly logger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest<Request | RequestWithUser>();
    const response = context.switchToHttp().getResponse<Response>();
    const dateNow = Date.now();

    this.logger.log(`${request.method} ${request.path}`);

    return next.handle().pipe(
      tap(() => {
        if ('user' in request)
          this.logger.log(`Route accessed by the user ${request.user.sub}`);
        this.logger.log(
          `Status response: ${response.statusCode} - ${Date.now() - dateNow}ms`,
        );
      }),
    );
  }
}
