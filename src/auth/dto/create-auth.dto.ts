import { IsNotEmpty, IsEmail, IsString,MinLength } from 'class-validator'
import { UserRolesEnum } from 'src/user/enum/user.enum'
export class CreateAuthDto {
    email: string
    password: string
}

export class TokenDto {
    userId: string
    userName: string
    isVerified: boolean
    userRoles: UserRolesEnum[]
}