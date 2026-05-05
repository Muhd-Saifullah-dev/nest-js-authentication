import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUserByEmail(email: string): Promise<User | null> {
    console.log('email', email);
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }
  async create_user(registerDto: RegisterDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: registerDto.password,
        name: registerDto.password,
      },
    });
  }
}
