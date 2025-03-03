import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginInputDto, loginUserOutputDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: loginInputDto): Promise<loginUserOutputDto> {
    return this.authService.login(body);
  }
}
