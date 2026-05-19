import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  // 查询用户信息
  async getCurrentUser(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    return user;
  }

  //   更新用户信息
  async updateCurrentUser(userId: number, UpdateUserDto: UpdateUserDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('用户不存在');
    }

    const updateUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: UpdateUserDto,
    });

    return updateUser;
  }
}
