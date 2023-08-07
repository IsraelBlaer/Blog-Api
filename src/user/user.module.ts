import { Global, Module } from '@nestjs/common';
import { UserController } from './controller/user.controller'
import { UserService } from './service/user.service';
import {MongooseModule} from '@nestjs/mongoose'
import { UserSchema,User } from './model/user.model';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports:[
  MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
  JwtModule
],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
