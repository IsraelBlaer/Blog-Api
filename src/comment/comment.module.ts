import { Controller, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostModule } from 'src/blog-post/blog-post.module';
import { Comment,CommentSchema } from './model/comment.model';
import { CommentController } from './controller/comment.controller';
import { CommentService } from './service/comment.service';
import { BlogPost, BlogPostSchema } from 'src/blog-post/model/blog-post.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
 imports:[
    MongooseModule.forFeature([{name:Comment.name, schema:CommentSchema}]),
    MongooseModule.forFeature([{name:BlogPost.name, schema : BlogPostSchema}]),
    JwtModule

 ],
 controllers:[CommentController],
 providers:[CommentService]

})
export class CommentModule {}
