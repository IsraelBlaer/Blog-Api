import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/utils/decorators/public.decorator';
import { UploadService } from '../service/upload.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService:UploadService){ }

    allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    
    @Public()
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile(new ParseFilePipe({
        validators:[
            new MaxFileSizeValidator({maxSize:5*1024*1024}),
            new FileTypeValidator({fileType:'image/jpeg'})
        ]
    })) 
    file:Express.Multer.File
    ){
        console.log(file);
        const {originalname, buffer} = file
    return await this.uploadService.uploadProfilePicture(originalname,buffer)
    }
}
