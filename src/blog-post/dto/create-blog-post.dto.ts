import {IsString, IsNotEmpty} from 'class-validator'

export class CreateBlogPostDto {
    
     @IsString()
     @IsNotEmpty()   
     title : string
     
     @IsString()
     @IsNotEmpty()
     content:string
      
     @IsString()
     @IsNotEmpty()
     category:string
    
}