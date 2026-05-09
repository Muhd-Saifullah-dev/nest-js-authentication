import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus()
    const message = this.prepareValidation(exception);
    this.logger.error(
      `[${request.method}] ${request.url} ${status} --Error-- ${JSON.stringify(message)} `,
      (exception as Error).stack,
    );


    
    response.status(status).json({
      success: false,

      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      data: null,
    });
  }

  private prepareValidation(exception: HttpException): string {
    const exceptionResponse = exception.getResponse();
    if (
      exception instanceof BadRequestException &&
      typeof exceptionResponse === 'object'
    ) {
      const errorData = (exceptionResponse as any).message;
      const firstError = Array.isArray(errorData) ? errorData[0] : errorData;
      if (
        firstError &&
        typeof firstError === 'object' &&
        firstError.constraints
      ) {
        return Object.values(firstError.constraints)[0] as string;
      }
      return Array.isArray(errorData) ? errorData[0] : errorData;
    }
    //fallback
    return typeof exceptionResponse === 'string'
      ? exceptionResponse
      : (exceptionResponse as any).message || 'Internal server error';
  }
}
