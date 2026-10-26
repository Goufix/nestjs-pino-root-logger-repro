import { LoggerModule, Params } from 'nestjs-pino';

const params: Params = {
  pinoHttp: {
    autoLogging: false,
    customProps: () => ({ service: 'greeting-api' }),
  },
};

export const loggerModule =
  process.env.MODE === 'async'
    ? LoggerModule.forRootAsync({ useFactory: async () => params })
    : LoggerModule.forRoot(params);
