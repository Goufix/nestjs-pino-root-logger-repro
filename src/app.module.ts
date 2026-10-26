import { Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { GreetingService } from './greeting/greeting.service';
import { InjectedGreetingService } from './greeting/injected-greeting.service';
import { loggerModule } from './logger.config';

const greetingProvider: Provider = process.env.INJECTED
  ? { provide: GreetingService, useClass: InjectedGreetingService }
  : GreetingService;

@Module({
  imports: [loggerModule],
  controllers: [AppController],
  providers: [greetingProvider],
})
export class AppModule {}
