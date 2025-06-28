import { Module } from '@nestjs/common';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmsService } from './alarms.service';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { OrmAlarmPersistenceModule } from '../infrastructure/persistence/orm/ormAlarmPersistence.module';

@Module({
    imports: [OrmAlarmPersistenceModule],
    controllers: [AlarmsController],
    providers: [AlarmsService, AlarmFactory],
})
export class AlarmsModule { }
