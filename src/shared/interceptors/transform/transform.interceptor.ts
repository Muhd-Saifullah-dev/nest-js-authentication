import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request, Response } from 'express';
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TransformInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode;
        this.logger.log(
          `[ ${request.url}]  ${request.method} -- ${statusCode} --[${JSON.stringify(request.body)}]`,
        );
        return {
          code: statusCode,
          message: 'success',
          data: data,
        };
      }),
    );
  }
}
