import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { loadBaseConfig } from "./infrastructure/config/base.config";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [loadBaseConfig],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
