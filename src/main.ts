import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.listen(0);

  const { port } = app.getHttpServer().address();
  await fetch(`http://127.0.0.1:${port}/hello`);

  await new Promise((resolve) => setTimeout(resolve, 100));
  await app.close();
}

bootstrap();
