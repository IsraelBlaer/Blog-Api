import { BadRequestException, PipeTransform,Injectable } from "@nestjs/common";
import mongoose from 'mongoose'

@Injectable()
export class ParseObjectID implements PipeTransform <string,mongoose.Types.ObjectId>{
    

     transform(value: string):mongoose.Types.ObjectId {
       // if(!(mongoose.isValidObjectId(value))) 
    
    try {
    const newValue =  new  mongoose.Types.ObjectId(value)
    return newValue

    } catch (error) {
        console.log(error)
        throw new BadRequestException("Invalid ObjectId Parsed")
    }
   
}

}