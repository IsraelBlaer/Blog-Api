import { Body, Controller, Post ,UsePipes,ValidationPipe,UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JoiValidationPipe } from 'src/utils/pipes/validation.pipe';
import { UserValidaton } from '../validator/user.validator';
import { CreateUserGuard } from '../guard/user.guard';
import { User } from '../model/user.model';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('user')
export class UserController {
     
     constructor(
      private userService:UserService
      ){}
      
     @Post('SignUp')
     @UseGuards(CreateUserGuard)
    
     @UsePipes(new JoiValidationPipe(UserValidaton.userSchema) )
     createUser(@Body() user:CreateUserDto):Promise<User>{
        
       return this.userService.signUp(user)
     }

}
