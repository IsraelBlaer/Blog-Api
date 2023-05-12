import { Injectable, CanActivate, ExecutionContext , BadRequestException} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../service/user.service';
import {Request} from 'express'

@Injectable()
export class CreateUserGuard implements CanActivate {
    constructor(
        private readonly userService: UserService
          ) {}
  async canActivate(
    context: ExecutionContext,
  ) {
    
    const req: Request = context.switchToHttp().getRequest();
    const value : CreateUserDto = req.body // as unknown as CreateUserDto
    const doesEmailExist = await this.userService.fetchUserByEmail(value.email)
    if(doesEmailExist) throw new BadRequestException(` user with this email already exist, provide new email`)
     
    return true;
  }

}
