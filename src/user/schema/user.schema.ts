import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'

@Schema()
export class User {
    
    @Prop()
    userName:string
    
    @Prop()
    password:string
   
    @Prop()
    email:string
   
    @Prop()
    firstName:string

    @Prop()
    lastName:string
    
    @Prop({type:[String], enum:["ADMIN","AUTHOR","USER"], default:"USER"})
    roles:string[]
    
    @Prop({type:Boolean, default:false})
    isVerified:boolean
     
    @Prop({type:Date, default:Date.now()})
    createdAt:Date
    
    @Prop(String)
    Avatar:String
}

export const UserSchema = SchemaFactory.createForClass(User)