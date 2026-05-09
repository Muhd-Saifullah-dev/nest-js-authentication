import {
  BadRequestException,
  ConflictException,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { compare_password, hashing_password } from 'src/utils/bcrypt';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtTokenService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existUser = await this.userService.getUserByEmail(registerDto.email);

    if (existUser) {
      throw new ConflictException('email already taken');
    }
    const hash_password = await hashing_password(registerDto.password);
    const user = await this.userService.create_user({
      ...registerDto,
      password: hash_password,
    });
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.generateToken(payload);

    return {
      message: 'User created successfully',
      data: { user, access_token },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    const matchedPassword = await compare_password(
      loginDto.password,
      user.password,
    );
    if (!matchedPassword) {
      throw new BadRequestException('email or password is invalid ');
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.generateToken(payload);
    return {
      message: 'login success',
      data: { user, access_token },
    };
  }

  async get_profile(userId: number) {
    const user = await this.userService.getUserById(userId);
    if(!user){
      throw new UnauthorizedException("user not found")
    }
    return { message: 'user fetched successfully', data: { user } };
  }
}
