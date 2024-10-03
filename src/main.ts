import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger: Logger = new Logger('NestApplication');
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  logger.log(`The Server started at PORT ${PORT}`);
}
bootstrap();
