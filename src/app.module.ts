import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadBaseConfig } from "./infrastructure/config/base.config";
import { AlarmsModule } from './alarms/application/alarms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmDo } from './alarms/infrastructure/persistence/orm/dos/alarm.do';
import { loadDatabaseConfig } from './infrastructure/config/db.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [loadBaseConfig, loadDatabaseConfig],
  },
  ),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        type: 'postgres',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        synchronize: true,
        entities: [AlarmDo],
      }
    },
  }),
    AlarmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
