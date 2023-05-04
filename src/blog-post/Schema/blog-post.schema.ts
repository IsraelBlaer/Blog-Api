import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { type } from "os";

@Schema()
export class BlogPost {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
    user: mongoose.Schema.Types.ObjectId

    @Prop()
    title: string

    @Prop()
    userName: string

    @Prop()
    content: string

    //todo
    //  @Prop()
    //  thumbNail:string
     

    //todo
    //  @Prop(Number)
    //  followers:number

    @Prop({ type: String, enum: ["Sport", "Food", "Tech", "Politics", "Entertainment"], default: "All" })
    category: string


}
export type BlogPostDocument = HydratedDocument<BlogPost>


export const BlogPostSchema = SchemaFactory.createForClass(BlogPost)