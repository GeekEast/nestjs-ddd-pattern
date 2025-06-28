import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadBaseConfig } from "./common/config/base.config";
import { AlarmsModule } from './modules/alarms/application/alarms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmDo } from './modules/alarms/infrastructure/persistence/orm/dos/alarm.do';
import { loadDatabaseConfig } from './common/config/db.config';
import { CoreModule } from './modules/core/core.module';
import { AlarmInfrastructureModule } from './modules/alarms/infrastructure/alarm-infrastructure.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';

@Module({})
export class AppModule {
  static register(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        AlarmsModule.withInfrastructure(AlarmInfrastructureModule.use(options.driver)),
      ],
    }
  }
}
