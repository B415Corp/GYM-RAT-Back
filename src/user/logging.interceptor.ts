import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        // Логирование результата запроса
        const responseTime = Date.now() - startTime;
        const statusCode = response.statusCode;
        this.logger.log(
          `${method} ${url} - Status: ${statusCode} - Execution time: ${responseTime}ms - Response: ${JSON.stringify(
            data,
          )}`,
        );
        return data;
      }),
    );
  }
}
