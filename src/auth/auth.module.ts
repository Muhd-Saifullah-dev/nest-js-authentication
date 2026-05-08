import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserModule } from 'src/user/user.module';
import { JwtTokenModule } from 'src/jwt-token/jwt-token.module';


@Module({
  imports:[UserModule,JwtTokenModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
