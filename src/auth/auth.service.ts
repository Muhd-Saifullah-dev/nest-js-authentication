import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterDto) {
    console.log('REGISTER DTO:', registerDto);
    const existUser = await this.userService.getUserByEmail(registerDto.email);

    if (existUser) {
      console.log('EXIST USER: in If', existUser);
      throw new ConflictException('email already taken');
    }
    console.log('EXIST USER:', existUser);
    const user = await this.userService.create_user(registerDto);
    return { message: 'User can be created', user };
  }
}
