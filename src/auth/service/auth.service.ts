import { ConflictException, Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/service/user.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   
   constructor(
      private userService: UserService,
      private jwtService: JwtService
   ) { }
    
   async signIn(userDto: CreateAuthDto) {
      
      const user = await this.userService.fetchUserByEmail(userDto.email)
       
      if (!user) throw new NotFoundException("Invalid email or password")
      
      if (!(await (this.userService.comparePassword(userDto.password,user.password)))) throw new UnauthorizedException("Invalid email or password")
      
      const payLoad = {
         userId: user.id,
         userName: user.userName,
         isVerified: user.isVerified,
         userRoles: user.roles
      }
   
      return {
         userName: user.userName,
         roles : user.roles,
         access_token: await this.jwtService.signAsync(payLoad),
       }
   }

   async signJwt(payLoad: Object): Promise<string> {
      
      return this.jwtService.signAsync({ ...payLoad },

         {
         algorithm: 'HS256',
         expiresIn: '15m',
         secret: process.env.PRIVATE_KEY
      }

      )

   }

}
