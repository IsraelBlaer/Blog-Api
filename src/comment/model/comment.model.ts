import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;


@Schema()
export class Comment {

 @Prop({type:ObjectId , ref:'User'})
 Author: string

 @Prop({type:ObjectId})
 blogId:string
 
 @Prop()
 text : string;
  
 @Prop({type:ObjectId, ref:'Comment'})
 parentCommentId:string

 @Prop({types:Date, default:Date.now()})
 createdAt : Date
  
// @Prop([{ type: Comment }])
 replies: Comment[]
 
}

export const CommentSchema =  SchemaFactory.createForClass(Comment)

