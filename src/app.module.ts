import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { DeserializeAuthToken } from './utils/middleware/tokenDeserializer';
import { UploadModule } from './upload/upload.module';


@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    BlogPostModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
    CommentModule,
    UploadModule,
  ],

})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(DeserializeAuthToken)
    .forRoutes('*')
  }
}
