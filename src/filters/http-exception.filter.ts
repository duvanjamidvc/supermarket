import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BusinessException } from '../exceptions/business.exception';
import ErrorResponseDto from './error-response.dto';
import * as http from 'http';

@Catch(BusinessException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status: HttpStatus = exception.getStatus();
    const message = exception.message;
    const responseData = {
      statusCode: status,
      error: http.STATUS_CODES[status],
      message: message,
    } as ErrorResponseDto;
    response.status(status).json(responseData);
  }
}
