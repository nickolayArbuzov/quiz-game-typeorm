import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import cookieParser = require('cookie-parser');
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import * as config from './config/root';
import { HttpExceptionFilter } from './helpers/filters/http-exeption.filter';

async function start() {
  
  const app = await NestFactory.create(AppModule, { cors: {
    origin: ['https://bloger-platform.vercel.app', 'https://blogger-platform-admin.vercel.app', 'http://localhost:3000'],
    credentials: true
  }})
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    transform: true,
    exceptionFactory: (errors) => {
      const customErrors = [];
      errors.forEach(e => {
        const keys = Object.keys(e.constraints)
        keys.forEach(k => {
          customErrors.push({
            message: e.constraints[k],
            field: e.property,
          })
        })
      })
      throw new BadRequestException(customErrors)
    }
  }))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(cookieParser());
  //app.setGlobalPrefix('api')
  await app.listen(config.PORT, () => console.log(`NEST on ${config.PORT}`))
}

start()