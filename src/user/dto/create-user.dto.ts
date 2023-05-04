import { IsNotEmpty, IsEmail, IsString, IsOptional, MinLength, IsArray, IsBoolean } from 'class-validator'

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    userName: string

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string
    
    @IsEmail()
    //  @IsNotEmpty()
    email: string

    @IsOptional()
    Avatar: String
    
    @IsArray()
    @IsOptional()
    roles:String[]

    @IsString()
    @IsNotEmpty()
    firstName:String
    
    @IsString()
    @IsNotEmpty()
    lastName:String

    // @IsBoolean()
    // @IsOptional()
   // isVerified:Boolean
}

