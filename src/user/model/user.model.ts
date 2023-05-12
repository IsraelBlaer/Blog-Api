import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import { UserTypesEnum } from '../enum/user.enum'

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
    
    @Prop({type:[String],enum:Object.values(UserTypesEnum), default:UserTypesEnum.User})
    roles:UserTypesEnum[]
    
    @Prop({type:Boolean, default:false})
    isVerified:boolean
     
    @Prop({type:Date, default:Date.now()})
    createdAt:Date
    
    @Prop(String)
    Avatar:String
}

export const UserSchema = SchemaFactory.createForClass(User)