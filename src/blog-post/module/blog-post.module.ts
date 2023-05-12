import { Module } from '@nestjs/common';
import { BlogPostService } from '../service/blog-post.service';
import { BlogPostController } from '../controller/blog-post.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { BlogPost, BlogPostSchema } from '../model/blog-post.schema';
import { AuthModule } from 'src/auth/module/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/module/user.module';


@Module({
  imports : [
   MongooseModule.forFeature([{name:BlogPost.name, schema : BlogPostSchema}]),
   AuthModule,
   JwtModule,
   UserModule
  ],
  providers: [BlogPostService],
  controllers: [BlogPostController]
})
export class BlogPostModule {}
