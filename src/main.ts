import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors({
    origin: 'https://chat-ep-front.vercel.app',
    credentials: true,
  });
  await app.listen(process.env.PORT || 4000);
  console.log('Server started on', process.env.PORT || 4000);
}
bootstrap();
