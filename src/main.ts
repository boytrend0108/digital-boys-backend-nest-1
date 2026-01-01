import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // Enable validation globally
  app.setGlobalPrefix('api'); // Set global prefix for all routes

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
