import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: '用户注册',
    description: '使用前端生成的 openId、昵称和头像地址注册用户',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '用户登录',
    description: '使用前端生成并本地保存的 openId 登录，成功后返回 JWT 令牌',
  })
  @ApiResponse({ status: 200, description: '登录成功，返回 JWT 令牌' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
