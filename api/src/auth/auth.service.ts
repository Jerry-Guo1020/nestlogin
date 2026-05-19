import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const exitstingUser = await this.prismaService.user.findUnique({
      where: {
        openId: registerDto.openId,
      },
    });

    if (exitstingUser) {
      throw new Error('该用户对应的openid已存在');
    }

    const user = await this.prismaService.user.create({
      data: {
        openId: registerDto.openId,
        nickname: registerDto.nickname,
        avatar: registerDto.avatar,
      },
    });

    const accessToken = await this.generateAccessToken(user.id, user.openId);

    return {
      user,
      accessToken,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        openId: loginDto.openId,
      },
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    const accessToken = await this.generateAccessToken(user.id, user.openId);

    return {
      user,
      accessToken,
    };
  }

  private async generateAccessToken(userId: number, openId: string) {
    return this.jwtService.signAsync({
      sub: userId,
      openId,
    });
  }
}
