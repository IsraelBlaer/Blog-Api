import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, UsePipes, ValidationPipe,UseGuards,Req,ForbiddenException } from '@nestjs/common';
import { BlogPostService } from '../service/blog-post.service';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';
import { BlogPost } from '../model/blog-post.schema';
import { ParseObjectID } from 'src/utils/pipes/objectIdPipe';
import  {JoiValidationPipe} from '../../utils/pipes/validation.pipe'
import { BlogPostSchema, BlogPostParamSchema} from '../validator/blog-post.validator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserService } from 'src/user/service/user.service';

@Controller('blog-post')
export class BlogPostController {
    constructor(
        private readonly blogPostservice: BlogPostService,
        private readonly userService:UserService
        ) { }
     
    
    @UseGuards(AuthGuard)
    @Post('create')
    @UsePipes(new JoiValidationPipe(BlogPostSchema))
    createBlogPost(@Body()  blogPost: CreateBlogPostDto, @Req() req): Promise<BlogPost> {
        console.log(req.user)
        const {userName,userId,userRoles} = req.user
     //   if(!(this.userService.checkUserRole(userRoles))) throw new ForbiddenException("Apply to become an author to create content")
        return this.blogPostservice.createBlogPost(blogPost,userName,userId)
    }
    
    @Get()
    getAllBlogPost(): Promise<BlogPost[]> {
        return this.blogPostservice.getAllBlogPost()
    }
   
    @Get(':id')
    getBlogPostById(@Param('id', new ParseObjectID()) id:string): Promise<BlogPost> {
        console.log("id type:",typeof id )
        return this.blogPostservice.getBlogPostById(id)
    }
    
    
    @Get('category/:category')
   // @UsePipes(new JoiValidationPipe(BlogPostParamSchema))
    getAllBlogPostByCategory(@Param('category', new JoiValidationPipe(BlogPostParamSchema)) category: string): Promise<BlogPost[]> {
        return this.blogPostservice.getAllBlogPostByCategory(category)
    }
    
    @Get('publisher/:postPublisher')
    getBlogPostByPublisher(@Param('postPublisher', new JoiValidationPipe(BlogPostParamSchema)) postPublisher: string): Promise<BlogPost[]> {
        return this.blogPostservice.getAllBlogPostByPublisher(postPublisher)
    }
    
    @Put('update/:id')
    updateBlogPost(@Param('id', new ParseObjectID()) id: string, @Body() blogPost: CreateBlogPostDto): Promise<BlogPost[]> {
        return this.blogPostservice.updateBlogPost(id, blogPost)
    }
    
    @Delete('delete/:id')
    deleteBlogPost(@Param('id', new ParseObjectID()) id: string): Promise<BlogPost[]> {
        return this.blogPostservice.deleteBlogPost(id)
    }

}
