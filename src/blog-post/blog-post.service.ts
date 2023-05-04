import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { BlogPost } from './Schema/blog-post.schema';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';

@Injectable()
export class BlogPostService {

    constructor(@InjectModel(BlogPost.name) readonly blogPostModel: Model<BlogPost>) { }


    async createBlogPost(blogPost: CreateBlogPostDto): Promise<BlogPost> {
        return await this.blogPostModel.create(blogPost)
    }

    async getAllBlogPost(): Promise<BlogPost[]> {
        return await this.blogPostModel.find()
    }

    async getAllBlogPostByCategory(category: string): Promise<BlogPost[]> {
        return await this.blogPostModel.find({ category: category })
    }

    async getBlogPostByUser(name:string): Promise<BlogPost[]> {
        return await this.blogPostModel.find({userName:name})
    }

    async updateBlogPost(id:string, blogPost:CreateBlogPostDto): Promise<BlogPost[]> {
        return await this.blogPostModel.findByIdAndUpdate(id,{...blogPost})
    }
    
    async deleteBlogPost(id:string): Promise<BlogPost[]> {
        return await this.blogPostModel.findByIdAndDelete(id)
    }

    

}