import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';
import { JwtTokenModule } from 'src/jwt-token/jwt-token.module';

@Module({
  imports: [AuthModule,JwtTokenModule],
  controllers: [NotesController],
  providers: [NotesService, PrismaService],
})
export class NotesModule {}
