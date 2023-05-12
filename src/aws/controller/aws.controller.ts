import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, ParseFilePipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from '../service/aws.service';
//import {Express} from  //@ts-ignore

@Controller('image')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}
   
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    fileFilter: (req, file, cb) => {
      if(!file) return cb(null, true);
      const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
      
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Invalid file type'), false);
      }
    },
  }))

  async uploadImage(@UploadedFile(new ParseFilePipe()) file): Promise<{ url: string }> {
    const url = await this.awsService.uploadPublicFile(file, 'images');
    return { url };
  }


}
