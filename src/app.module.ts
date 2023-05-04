import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BlogPostModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
   
  ],

})
export class AppModule {}
