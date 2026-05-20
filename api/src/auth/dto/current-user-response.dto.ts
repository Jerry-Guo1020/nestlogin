import { ApiProperty } from '@nestjs/swagger';

export class CurrentUserResponseDto {
  @ApiProperty({
    description: '用户主键 ID',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: '前端生成的自定义 openId',
    example: 'test-openid-1001',
  })
  openId!: string;

  @ApiProperty({
    description: '用户昵称',
    example: '测试用户',
  })
  nickname!: string;

  @ApiProperty({
    description: '用户头像地址',
    example: 'https://example.com/avatar.png',
  })
  avatar!: string;

  @ApiProperty({
    description: '用户名',
    example: 'jerry',
    nullable: true,
  })
  username!: string | null;

  @ApiProperty({
    description: '性别',
    example: '男',
    nullable: true,
  })
  sex!: string | null;

  @ApiProperty({
    description: '年级',
    example: '大二',
    nullable: true,
  })
  grade!: string | null;

  @ApiProperty({
    description: '学院',
    example: '计算机学院',
    nullable: true,
  })
  college!: string | null;

  @ApiProperty({
    description: '子学院',
    example: '软件工程系',
    nullable: true,
  })
  subCollege!: string | null;

  @ApiProperty({
    description: '专业',
    example: '软件工程',
    nullable: true,
  })
  major!: string | null;

  @ApiProperty({
    description: '是否为新用户',
    example: true,
  })
  isNewUser!: boolean;

  @ApiProperty({
    description: '创建时间',
    example: '2026-05-19T08:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: '更新时间',
    example: '2026-05-19T08:00:00.000Z',
  })
  updatedAt!: Date;
}
