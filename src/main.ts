import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envalidate } from './utils/envalidate';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/http-exception.filter';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
async function bootstrap() {
  envalidate();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const PORT = 10000;
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(morgan('combined'));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  Logger.log(
    `Attendance Service running at http://localhost:${PORT}`,
    'Bootstrap',
  );
}
bootstrap();
