import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: '用户昵称',
    example: '新的昵称',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nickname?: string;

  @ApiPropertyOptional({
    description: '用户名',
    example: 'jerry',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  username?: string;

  @ApiPropertyOptional({
    description: '性别',
    example: '男',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  sex?: string;

  @ApiPropertyOptional({
    description: '年级',
    example: '大二',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  grade?: string;

  @ApiPropertyOptional({
    description: '学院',
    example: '计算机学院',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  college?: string;

  @ApiPropertyOptional({
    description: '子学院',
    example: '软件工程系',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  subCollege?: string;

  @ApiPropertyOptional({
    description: '专业',
    example: '软件工程',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  major?: string;

  @ApiPropertyOptional({
    description: '头像地址',
    example: 'https://example.com/new-avatar.png',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatar?: string;
}
