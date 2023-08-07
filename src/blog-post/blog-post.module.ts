import { Global, Module } from '@nestjs/common';
import { BlogPostService } from './service/blog-post.service';
import { BlogPostController } from './controller/blog-post.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { BlogPost, BlogPostSchema } from './model/blog-post.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports : [
   MongooseModule.forFeature([{name:BlogPost.name, schema : BlogPostSchema}]),
   JwtModule,
  ],
  providers: [
    // {
    //  provide:APP_GUARD,
    //   useClass:AuthGuard
    // },
    // {
    //   provide:APP_GUARD,
    //   useClass:ThrottlerGuard
    // },
    BlogPostService
  ],
  controllers: [BlogPostController],
  exports:[BlogPostService]
})
export class BlogPostModule {}
