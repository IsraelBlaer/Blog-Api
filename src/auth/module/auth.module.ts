import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';
import { UserService } from 'src/user/service/user.service';
import { UserModule } from 'src/user/module/user.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guard/auth.guard';
import { ConfigService,ConfigModule } from '@nestjs/config';


@Module({
  
  imports:[
    UserModule,
    // JwtModule.register({
    //   global: true,
    //   secret:process.env.PRIVATE_KEY,
    //   signOptions: { expiresIn: '15m' },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.PRIVATE_KEY,//configService.get<string>('PRIVATE_KEY'),
        signOptions: { expiresIn: '15m' }, 
      }),
      inject: [ConfigService],
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
