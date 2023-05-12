import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) { }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log(token)
       if (!token) throw new UnauthorizedException()
      
        try {
            const payLoad =  await this.jwtService.verifyAsync(token, { secret:process.env.PRIVATE_KEY })
            console.log(payLoad)
            request['user'] = payLoad
        } catch(error) {
            console.log(error)
            throw new UnauthorizedException()
        }


        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const token = request.get("authorization")
        console.log(token)
        return token
      }
     
}