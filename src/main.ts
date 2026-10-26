import 'reflect-metadata';
import { Controller, Get, Injectable, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LoggerModule, Params, PinoLogger } from 'nestjs-pino';

@Injectable()
class GreetingService {
  private readonly logger = new PinoLogger({ renameContext: 'greeting' });

  greet(): string {
    this.logger.info('greeting sent');
    return 'hello';
  }
}

@Injectable()
class InjectedGreetingService {
  constructor(private readonly logger: PinoLogger) {}

  greet(): string {
    this.logger.info('greeting sent');
    return 'hello';
  }
}

@Controller()
class AppController {
  constructor(private readonly greeting: GreetingService) {}

  @Get('hello')
  hello(): string {
    return this.greeting.greet();
  }
}

const params: Params = { pinoHttp: { autoLogging: false, customProps: () => ({ service: 'greeting-api' }) } };

@Module({
  imports: [
    process.env.MODE === 'async'
      ? LoggerModule.forRootAsync({ useFactory: async () => params })
      : LoggerModule.forRoot(params),
  ],
  controllers: [AppController],
  providers: [
    process.env.INJECTED ? { provide: GreetingService, useClass: InjectedGreetingService } : GreetingService,
  ],
})
class AppModule {}

async function main() {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.listen(0);
  const { port } = app.getHttpServer().address();
  await fetch(`http://127.0.0.1:${port}/hello`);
  await new Promise((resolve) => setTimeout(resolve, 100));
  await app.close();
}

main();
