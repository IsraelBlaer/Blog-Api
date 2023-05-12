import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { BlogPostCategoryTypesEnum } from "../enum/blog-post.enum";


@Schema()
export class BlogPost {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
    publisherID: mongoose.Schema.Types.ObjectId

    @Prop()
    title: string

    @Prop()
    publisher:string

    @Prop()
    content:string
     
    //todo
    //  @Prop()
    //  thumbNail:string
     
    @Prop({ type: String, enum: Object.values(BlogPostCategoryTypesEnum)})
    category: string
    
    @Prop({types:Date, default:Date.now()})
    createdAt : Date

}
export type BlogPostDocument = HydratedDocument<BlogPost>


export const BlogPostSchema = SchemaFactory.createForClass(BlogPost)