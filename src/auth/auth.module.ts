import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserModule } from 'src/user/user.module';
import { JwtTokenModule } from 'src/jwt-token/jwt-token.module';
import { AuthGuard } from './guards/auth.guard';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';


@Module({
  imports: [UserModule, JwtTokenModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
