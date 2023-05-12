import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import {MongooseModule} from '@nestjs/mongoose'
import { UserSchema,User } from '../model/user.model';
import { AwsService } from 'src/aws/service/aws.service';
import { AwsModule } from 'src/aws/module/aws.module';


@Module({
 
  imports:[
  MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
  AwsModule
],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
