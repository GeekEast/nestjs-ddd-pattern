import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ApplicationDriver } from './common/interfaces/application-bootstrap-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register({ driver: ApplicationDriver.ORM }));
  const configService = app.get(ConfigService);
  const port = configService.get('base.port');

  await app.listen(port, () => {
    Logger.log(`🚀 Server is running on port ${port}`, "main.ts");
  });
}

bootstrap();
