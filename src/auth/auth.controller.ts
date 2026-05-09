import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post("/login")
  login(@Body() loginDto:LoginDto){
    return this.authService.login(loginDto)
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  get_profile(@Req() req:any){
    return this.authService.get_profile(req.user.sub)
  }
}
