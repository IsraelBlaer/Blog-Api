import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import { UserRolesEnum } from '../enum/user.enum'


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
    
    @Prop({type:[String],enum:Object.values(UserRolesEnum), default:UserRolesEnum.User})
    roles:UserRolesEnum[]
    
    @Prop({type:Boolean, default:false})
    isVerified:boolean
     
    @Prop({type:Date, default:Date.now})
    createdAt:Date
    
    @Prop()
    profilePicture:string
}

export const UserSchema = SchemaFactory.createForClass(User)