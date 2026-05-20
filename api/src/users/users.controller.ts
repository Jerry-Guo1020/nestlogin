import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUserResponseDto } from 'src/auth/dto/current-user-response.dto';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    openId: string;
  };
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '获取当前登录用户信息' })
  @ApiResponse({
    status: 200,
    description: '获取当前登录用户信息成功',
    type: CurrentUserResponseDto,
  })
  getMe(@Req() req: AuthenticatedRequest) {
    return this.usersService.getCurrentUser(req.user.userId);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '更新当前登录用户信息' })
  @ApiResponse({
    status: 200,
    description: '更新当前登录用户信息成功',
    type: CurrentUserResponseDto,
  })
  updateMe(
    @Req() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateCurrentUser(req.user.userId, updateUserDto);
  }
}
