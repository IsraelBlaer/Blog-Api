import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/module/blog-post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { UserModule } from './user/module/user.module';
import { AuthModule } from './auth/module/auth.module';
import { CommentService } from './comment/service/comment.service';
import { CommentModule } from './comment/module/comment.module';
import { CommentController } from './comment/comment.controller';
import { AwsController } from './aws/controller/aws.controller';
import { AwsService } from './aws/service/aws.service';
import { AwsModule } from './aws/module/aws.module';


@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    BlogPostModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
    CommentModule,
    AwsModule, 
  ],

  providers: [CommentService, AwsService],

  controllers: [CommentController, AwsController],

  // providers: [{
  //   provide : APP_PIPE,
  //   useClass : ObjectValidationPipe
  // },
// ],

})
export class AppModule {}
