import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class InjectedGreetingService {
  constructor(private readonly logger: PinoLogger) {}

  greet(): string {
    this.logger.info('greeting sent');
    return 'hello';
  }
}
