import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ApplicationDriver } from './common/interfaces/application-bootstrap-options.interface';
import { CONFIG_REGISTRY } from './common/config';
import { ConfigService } from '@future.ai/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register({ driver: ApplicationDriver.ORM }));
  const configService = app.get(ConfigService<typeof CONFIG_REGISTRY>);

  const port = configService.get("base.PORT")

  await app.listen(port, () => {
    Logger.log(`🚀 Server is running on port ${port}`, "main.ts");
  });
}

bootstrap();
