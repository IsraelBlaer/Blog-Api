import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { BlogPostCategoryTypesEnum } from "../enum/blog-post.enum";


@Schema()
export class BlogPost {  
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
    publisherID: string
    
    @Prop()
    title: string

    @Prop()
    content:string
     
    @Prop({enum: Object.values(BlogPostCategoryTypesEnum)})
    category: string
    
    @Prop({type:Array<String>})
    featuredImages:string[]
    
    @Prop({type:Date, default:Date.now})
    createdAt : Date
    
    @Prop({type:Date})
    updatedAt : Date
      
}


export type BlogPostDocument = HydratedDocument<BlogPost>


export const BlogPostSchema = SchemaFactory.createForClass(BlogPost)