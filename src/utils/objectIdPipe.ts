import { PipeTransform } from "@nestjs/common";
import { ObjectId, isValidObjectId, Types } from "mongoose";


// export class customObjectIdPipe implements PipeTransform<String, ObjectId> {
     

//     // transform(value:string):ObjectId{
     
//     // //  if(this.validateObjectId(value))  {
//     // //     new Types.ObjectId(value)
//     // //     return value;
//     // //  }
     
//     // }

//      validateObjectId (value:string) {
//      return isValidObjectId(value)
//     }
// }