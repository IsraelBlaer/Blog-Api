import { Injectable, NotFoundException } from '@nestjs/common';
import {Model, ObjectId} from 'mongoose'
import { BlogPost, BlogPostSchema } from '../model/blog-post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';

@Injectable()
export class BlogPostService {
    constructor(@InjectModel(BlogPost.name) private blogPostModel:Model<BlogPost> ){}
   
    createBlogPost(blogPost: CreateBlogPostDto, publisher:string, publisherID:ObjectId ): Promise<BlogPost> {
        const createBlogPost = new this.blogPostModel({
            ...blogPost,
            publisher,
            publisherID
        })
        return this.blogPostModel.create(createBlogPost)
    }
    
    
    getAllBlogPost(): Promise<BlogPost[]> {
        return this.blogPostModel.find()
    }

    
   async getBlogPostById(id:string): Promise<BlogPost> {
      const blogPost =   await this.blogPostModel.findOne({_id:id})
      if(!blogPost) throw new NotFoundException("Blog Post with this Id not found")
      return blogPost
    }

   
    getAllBlogPostByCategory(category: string): Promise<BlogPost[]> {
        return this.blogPostModel.find({category:category})
    }
    
    
    getAllBlogPostByPublisher(postPublisher: string): Promise<BlogPost[]> {
        return this.blogPostModel.find({userName:postPublisher})
    }
    
    
    updateBlogPost( id: string , blogPost: CreateBlogPostDto): Promise<BlogPost[]> {
        return this.blogPostModel.findByIdAndUpdate({_id: id, blogPost})
    }
    
   
    deleteBlogPost(id: string): Promise<BlogPost[]> {
        return this.blogPostModel.findByIdAndDelete({_id:id})
    }

}
