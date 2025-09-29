import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dtos/auth.dto';
import { AuthService as ExternalAuthService } from '@thallesp/nestjs-better-auth';

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
      this.logger.error('Error signing up:', error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error signing up user',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error, description: 'Error signing up user' },
      );
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
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error login user',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error, description: 'Error login user' },
      );
    }
  }
}
