import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const ip =
      request.headers['x-forwarded-for'] || request.headers['x-real-ip'];

    response.status(status).json({
      exception: 'ForbiddenException',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ip,
    });
  }
}
