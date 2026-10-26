import { Controller, Get } from '@nestjs/common';
import { GreetingService } from './greeting/greeting.service';

@Controller()
export class AppController {
  constructor(private readonly greetingService: GreetingService) {}

  @Get('hello')
  hello(): string {
    return this.greetingService.greet();
  }
}
