import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DeserializeAuthToken implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const access_token = this.extractTokenFromHeader(req);
        console.log(access_token);
        if (!access_token) return next();
        try {
            const payLoad = await this.jwtService.verifyAsync(access_token, { secret:this.configService.get<string>('PRIVATE_KEY')})
            console.log(payLoad)
            req['user'] = payLoad;
            return next();
        } catch (error) {
            if (error.name === "TokenExpiredError") throw new UnauthorizedException("Jwt Expired");
            throw new BadRequestException("Invalid Token");
        }
       
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        if(!token) return ;
        if(type!='Bearer'){
          throw new BadRequestException("Please provide a Bearer token ");
        }
        return token;
       // return type === 'Bearer' ? token : undefined;
      }

}

