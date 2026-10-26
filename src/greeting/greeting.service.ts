import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class GreetingService {
  private readonly logger = new PinoLogger({ renameContext: 'greeting' });

  greet(): string {
    this.logger.info('greeting sent');
    return 'hello';
  }
}
