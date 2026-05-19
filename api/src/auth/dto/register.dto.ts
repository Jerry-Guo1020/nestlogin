import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: '前端生成的自定义 openId',
    example: 'test-openid-1001',
    maxLength: 64,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  openId: string;

  @ApiProperty({
    description: '用户昵称',
    example: '测试用户',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nickname: string;

  @ApiProperty({
    description: '用户头像地址',
    example: 'https://example.com/avatar.png',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  avatar: string;
}
