import { Module } from '@nestjs/common';
import { AwsService } from '../service/aws.service';
import { AwsController } from '../controller/aws.controller';

@Module({
    controllers: [AwsController],
    providers: [AwsService],
    exports:[AwsService] 
})
export class AwsModule {
    
}
