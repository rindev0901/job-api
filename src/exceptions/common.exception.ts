import { HttpExceptionOptions, HttpException } from '@nestjs/common';
import { type Status, _statusCode } from 'better-auth';

type CommonExceptionParams = {
  message: string;
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  error: keyof typeof _statusCode | Status | string;
};

export class CommonException extends HttpException {
  constructor(params: CommonExceptionParams, options: HttpExceptionOptions) {
    super(
      {
        statusCode: params.statusCode,
        message: params.message,
        error: params.error,
      },
      params.statusCode,
      options,
    );
  }
}
