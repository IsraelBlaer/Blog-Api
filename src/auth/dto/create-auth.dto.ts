import { IsNotEmpty, IsEmail, IsString,MinLength } from 'class-validator'

export class CreateAuthDto {
    
    @IsEmail()
    //  @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string


    
}