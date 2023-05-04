import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { BlogPost } from './Schema/blog-post.schema';


@Controller('blog-post')
export class BlogPostController {
    constructor(private readonly blogPostservice: BlogPostService) { }

    @UsePipes(new ValidationPipe({transform:true}))
    @Post()
    createBlogPost(@Body() blogPost: CreateBlogPostDto): Promise<BlogPost> {
        return this.blogPostservice.createBlogPost(blogPost)
    }
    
    @Get()
    getAllBlogPost(): Promise<BlogPost[]> {
        return this.blogPostservice.getAllBlogPost()
    }

    @Get(':categrory')
    getAllBlogPostByCategory(@Param('category') category: string): Promise<BlogPost[]> {
        return this.blogPostservice.getAllBlogPostByCategory(category)
    }
    
    @Get(':postPublisher')
    getBlogPostByPublisher(@Param('postPublisher') postPublisher: string): Promise<BlogPost[]> {
        return this.blogPostservice.getBlogPostByUser(postPublisher)
    }
    
    @Put()
    updateBlogPost(@Param('id') id: string, @Body() blogPost: CreateBlogPostDto): Promise<BlogPost[]> {
        return this.blogPostservice.updateBlogPost(id, blogPost)
    }
    
    @Delete(':id')
    deleteBlogPost(@Param('id') id: string): Promise<BlogPost[]> {
        return this.blogPostservice.deleteBlogPost(id)
    }

}
