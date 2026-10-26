# nestjs-pino: `LoggerModule` params ignored since 5.1.0

`LoggerModule` is configured with ([`src/logger.config.ts`](src/logger.config.ts)):

```ts
{ pinoHttp: { autoLogging: false, customProps: () => ({ service: 'greeting-api' }) } }
```

[`GreetingService`](src/greeting/greeting.service.ts) creates its own logger with
`new PinoLogger({ renameContext: 'greeting' })` and logs `greeting sent` on `GET /hello`.
[`InjectedGreetingService`](src/greeting/injected-greeting.service.ts) is the same service with `PinoLogger`
injected by Nest, used as the control.

## Run

```sh
npm install
npm run matrix          # every scenario below on nestjs-pino 4.6.1, 5.0.0, 5.1.0 and 5.3.1
```

Single scenarios on the installed version (5.3.1):

```sh
npm start               # forRoot      + new PinoLogger()
npm run start:async     # forRootAsync + new PinoLogger()
npm run start:injected  # forRoot      + PinoLogger injected by Nest (control)
```

## Expected

One line, `"msg":"greeting sent"`, with `"service":"greeting-api"`, and no `"request completed"` line.

## Actual

| nestjs-pino | `new PinoLogger()` in a provider | `PinoLogger` injected |
|---|---|---|
| 4.6.1 | ✅ params applied | ✅ params applied |
| 5.0.0 | ✅ params applied | ✅ params applied |
| 5.1.0 | ❌ params ignored | ✅ params applied |
| 5.3.1 | ❌ params ignored | ✅ params applied |

Same result with `forRoot` and `forRootAsync`. When params are ignored, `"request completed"` is logged and
`service` is missing.

Node.js 24.19.0, @nestjs/core 11.1.6, pino 10.0.0, pino-http 11.0.0.
