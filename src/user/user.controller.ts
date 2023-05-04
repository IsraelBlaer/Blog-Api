import { Body, Controller, Post ,UsePipes,ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
     
    constructor(private userService:UserService){}
     
     @Post('SignUp')
     @UsePipes(new ValidationPipe({ transform: true }))
     createUser(@Body() user:CreateUserDto):Promise<CreateUserDto>{
       return this.userService.signUp(user)
     }

}
