import { Prop,Schema } from "@nestjs/mongoose";


@Schema()
export class createCommentSchema {

 @Prop({type: String, ref :'user'})
 user : string
 
 comment : string
 
  
}