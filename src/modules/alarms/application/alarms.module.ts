import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmsService } from './alarms.service';
import { AlarmFactory } from '../domain/factories/alarm.factory';

@Module({})
export class AlarmsModule {
    static withInfrastructure(infrastructureModule: Type | DynamicModule): DynamicModule {
        return {
            module: AlarmsModule,
            imports: [infrastructureModule],
            controllers: [AlarmsController],
            providers: [AlarmsService, AlarmFactory],
        }
    }
}
