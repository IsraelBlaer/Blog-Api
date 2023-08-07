import { Body, Controller, Post, UsePipes, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JoiValidationPipe,FileValidationPipe } from 'src/utils/pipes/validation.pipe';
import { UserValidaton } from '../validator/user.validator';
import { CreateUserGuard } from '../guard/user.guard';
import { User } from '../model/user.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { UploadService } from 'src/upload/service/upload.service';
import { TokenDecorator } from 'src/utils/decorators/user.decorator';
import { TokenDto } from 'src/auth/dto/create-auth.dto';


@Controller('user')
export class UserController {

  constructor(
    private  readonly userService: UserService,
    private readonly uploadService:UploadService
  ) { }

  @Post('signUp')
  @UsePipes(new JoiValidationPipe(UserValidaton.userSchema))
  @UseGuards(CreateUserGuard)
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    console.log("user:", user)
    return this.userService.signUp(user)
  }

  @Post('upload-profile-picture')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('profilePicture'))
  async uploadProfilePicture(
    @UploadedFile(new FileValidationPipe())file:Express.Multer.File,
    @TokenDecorator() tokenData:TokenDto) {
    const {Location} = await this.uploadService.uploadProfilePicture(file.originalname,file.buffer)
    return await this.userService.uploadProfile(Location, tokenData.userId);
  }


}
