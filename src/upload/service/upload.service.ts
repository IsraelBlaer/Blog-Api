import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3'
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadService {

    private S3_CLLIENT = new AWS.S3({
        region: this.configService.getOrThrow('AWS_S3_REGION')
    });

    constructor(private readonly configService: ConfigService) { }

    async uploadProfilePicture(fileName: string, file: Buffer) {

        return await this.S3_CLLIENT.upload({
            Bucket: 'izzyblogawsbucket',
            Key: fileName,
            Body: file,
        }).promise();
    }

     async uploadFeaturedImages(files: Express.Multer.File[]): Promise<string[]> {
        let uploadedFeaturedImages: string[] = [];
        try {
            for(const file of files){
                const {Location} =   await this.S3_CLLIENT.upload({
                       Bucket: 'izzyblogawsbucket',
                       Key: file.originalname,
                       Body: file.buffer,
                   }).promise();
                   console.log(Location);
                   uploadedFeaturedImages.push(Location);
               }
               return uploadedFeaturedImages;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
       
    }
    

}


