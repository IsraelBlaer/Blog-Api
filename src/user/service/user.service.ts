import { Injectable, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { User, UserSchema } from '../model/user.model';
import { CreateUserDto } from '../dto/create-user.dto'
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
    
    constructor(@InjectModel(User.name) readonly UserModel: Model<User>) { }
    
    
    async signUp(user: CreateUserDto):Promise<User> {
        
        
         const newUser =  new this.UserModel({...user})
         console.log(newUser)
    
         
        const result = await this.hashPassword(newUser.password)
         newUser.password=result
         return await newUser.save()
          
    }

    
    async fetchUserByEmail(email: string) {
        const userExist = await this.UserModel.findOne({ email: email })
        return userExist
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
      }

      async comparePassword(myPlaintextPassword:string, hash:string): Promise<boolean> {
         console.log(await bcrypt.compare(myPlaintextPassword,hash))
         return await bcrypt.compare(myPlaintextPassword,hash)
      }

       checkUserRole(userRoles:[]):boolean{
         let count = 0;
         while(count<userRoles.length){

            if(userRoles[count]==='AUTHOR') {
                return true
            }
            count ++ 
         }
         return false
      }
      
    }
    
    
  


