// 这个目的就是让后端学会从前端传回来的jwt，并还原出当前用户是谁

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface jwtpayload {
  sub: number; // 用户ID
  openId: string; // 用户的 openId
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('jwt 对不上');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: jwtpayload) {
    return {
      userId: payload.sub,
      openId: payload.openId,
    };
  }
}
