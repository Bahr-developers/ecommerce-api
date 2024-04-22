import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app';
import { appConfig } from 'config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    rawBody: true,
  });
  app.enableCors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    optionsSuccessStatus: 200,
    origin: '*',
  });
    
  await app.listen(appConfig.port);
}
bootstrap();