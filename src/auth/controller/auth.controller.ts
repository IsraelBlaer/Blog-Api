import {
Body,
Get,
Request,
Controller,
Post, 
UsePipes,
ValidationPipe,
UseGuards
     } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../guard/auth.guard';
import { Public } from 'src/utils/decorators/public.decorator';
import { JoiValidationPipe } from 'src/utils/pipes/validation.pipe';
import { authValidator } from '../validators/auth.validator';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
    
    ){}
  
  @Public()
  @Post('login')
  @UsePipes()
    signIn(@Body(new JoiValidationPipe(authValidator)) loginDto:CreateAuthDto){
    return  this.authService.signIn(loginDto)
  }    


}


