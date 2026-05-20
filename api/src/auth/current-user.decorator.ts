import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CurrentUserData {
  userId: number;
  openId: string;
}

interface RequestWithUser {
  user: CurrentUserData;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserData => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);