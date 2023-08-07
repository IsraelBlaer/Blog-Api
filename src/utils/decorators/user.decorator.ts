import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenDto } from 'src/auth/dto/create-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export const TokenDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user =  request.user as TokenDto
    const tokenData:TokenDto = {
      ...user,
    }
    return tokenData;
  },
);