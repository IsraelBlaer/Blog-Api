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
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
    
    ){}
  
  @Post('login')
  @UsePipes(new ValidationPipe({transform:true}))
    signIn(@Body() authDto:CreateAuthDto){
    return  this.authService.signIn(authDto)
  }    
  
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
