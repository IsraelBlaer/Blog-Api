import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports:[
    UserModule,
    JwtModule.register({
      global: true,
     secret: process.env.PRIVATE_KEY || "secretOrPrivateKey must have a value",
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    AuthService,
    //declaring authentication guard globally for all enpoint in this module
    //todo
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  controllers: [AuthController]
  
})
export class AuthModule {}
