import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk'
import Express from '@nestjs/platform-express'

@Injectable()
export class AwsService {
   
  async uploadPublicFile(file, folder: string) {

    const params: AWS.S3.PutObjectRequest = {
        Bucket: 'izzyblogawsbucket',
        Key: `${folder}/${file.originalname}`,
        Body: file.buffer,
       // ACL: 'public-read',
        ContentType: file.mimetype,
      };
       const s3 = new AWS.S3()
      const { Location } = await s3.upload(params).promise();
      return Location;
  }

}


