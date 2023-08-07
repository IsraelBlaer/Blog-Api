import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService,
                private reflector: Reflector
    ) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true; // Allow access to public routes
          }
        const user = request.user;
        if (!user) throw new UnauthorizedException("provive a valid jwt token");
        return true;
    }
}