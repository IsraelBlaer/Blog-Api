import { ConflictException, Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/service/user.service';
import { CreateAuthDto, TokenDto } from '../dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
   
   constructor(
      private userService: UserService,
      private jwtService: JwtService,
      private configService:ConfigService
   ) { }
    
   async signIn(loginDto: CreateAuthDto) {
      const user = await this.userService.fetchUserByEmail(loginDto.email);
      if (!user) throw new NotFoundException("Invalid email or password");
      if (!(await (this.userService.comparePassword(loginDto.password,user.password))))
       throw new UnauthorizedException("Invalid email or password");
      const payLoad:TokenDto = {
            userId: user.id,
            userName: user.userName,
            isVerified: user.isVerified,
            userRoles: user.roles
      }
      return {
         status: true,
         access_token: await this.jwtService.signAsync(payLoad,{secret:this.configService.get<string>('PRIVATE_KEY')}),
       }

   }

}
