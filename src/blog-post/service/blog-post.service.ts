import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import mongoose, {Model, ObjectId} from 'mongoose'
import { BlogPost, BlogPostSchema } from '../model/blog-post.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';


@Injectable()
export class BlogPostService {
    constructor(
        @InjectModel(BlogPost.name) private blogPostModel:Model<BlogPost>,
    ){}
   
    async createBlogPost(blogPost: CreateBlogPostDto, publisherID:string): Promise<BlogPost> {
        const createBlogPost = new this.blogPostModel({
            ...blogPost,
            publisherID
        })
      return await createBlogPost.save();
    }
    
    
    async getAllBlogPost(): Promise<BlogPost[]> {
        return await this.blogPostModel.find();
    }

   async getBlogPostById(id:string): Promise<BlogPost> {
      const blogPost =   await this.blogPostModel.findOne({_id:id})
      if(!blogPost) throw new NotFoundException("Blog Post with this Id not found")
      
      return blogPost
    }
    
    getAllBlogPostByCategory(category: string): Promise<BlogPost[]> {
        return this.blogPostModel.find({category:category})
    }
    
    async updateBlogPost( blogpostId: string , blogPost: CreateBlogPostDto): Promise<BlogPost[]> {
        return await this.blogPostModel.findByIdAndUpdate(blogpostId,{...blogPost},{new:true});
    }
   
    async deleteBlogPost(blogpostId: string): Promise<BlogPost[]> {
        return await this.blogPostModel.findByIdAndDelete(blogpostId)
    }

    

     
    


}




