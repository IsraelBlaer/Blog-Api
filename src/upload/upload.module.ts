import { Global, Inject, Module } from '@nestjs/common';
import { UploadService } from './service/upload.service';
import { UploadController } from './controller/upload.controller';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler'
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  imports:[
      /*
    throttle implementation
    Import the throttle modudle and set it conigurations asynchronously
    Throttle help to limit number of request to an endpoint in a defined specific time period
    */
   ThrottlerModule.forRootAsync(
    { 
      useFactory : (configService:ConfigService)=>({
        ttl: 60, 
        limit: 2
      }),
      inject:[ConfigService],
    }
   )
  ],
  providers: [
    UploadService,
  
    {
      provide:APP_GUARD,
      useClass:ThrottlerGuard
    }
  ],
  exports:[UploadService],
  controllers: [UploadController]
})
export class UploadModule {}
