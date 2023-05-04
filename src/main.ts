import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

async function bootstrap() {
  config()
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    enableDebugMessages :true,
    forbidNonWhitelisted : true,
    forbidUnknownValues : true,
    stopAtFirstError : true,
   
  }))
  await app.listen(4000);
}
bootstrap();
