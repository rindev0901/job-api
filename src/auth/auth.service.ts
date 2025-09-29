import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { LoginDto, SignUpDto } from './dtos/auth.dto';
import { AuthService as ExternalAuthService } from '@thallesp/nestjs-better-auth';
import { APIError } from 'better-auth/api';
import { CommonException } from '@/exceptions/common.exception';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly auth: ExternalAuthService) {}

  async signup(signUpData: SignUpDto) {
    try {
      return await this.auth.api.signUpEmail({
        body: {
          ...signUpData,
        },
      });
    } catch (error) {
      this.logger.error('Error signing up:' + JSON.stringify(error));
      if (error instanceof APIError) {
        throw new CommonException(
          {
            statusCode: error.statusCode,
            message: error.message,
            error: error.status,
          },
          { cause: error.cause },
        );
      }
      throw new InternalServerErrorException(error);
    }
  }
  async login(loginData: LoginDto) {
    try {
      return await this.auth.api.signInEmail({
        body: {
          ...loginData,
        },
      });
    } catch (error) {
      this.logger.error('Error login:' + JSON.stringify(error));

      if (error instanceof APIError) {
        throw new CommonException(
          {
            statusCode: error.statusCode,
            message: error.message,
            error: error.status,
          },
          { cause: error.cause },
        );
      }

      throw new InternalServerErrorException(error);
    }
  }
}
