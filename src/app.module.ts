import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppService } from './app.service';
import { auth } from './utils/auth';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule as LocalAuthModule } from './auth/auth.module';

@Module({
  imports: [
    LocalAuthModule,
    AuthModule.forRoot({ auth }),
    ConfigModule.forRoot(),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
