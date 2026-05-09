import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtTokenModule } from './jwt-token/jwt-token.module';
import { NotesModule } from './notes/notes.module';



@Module({
  imports: [AuthModule, UserModule,ConfigModule.forRoot(), JwtTokenModule, NotesModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
