import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmDo } from "./dos/alarm.do";
import { OrmAlarmRepository } from "./repository/alarm.repository";
import { AlarmRepository } from "src/modules/alarms/application/ports/alarm.repository";

@Module({
    imports: [TypeOrmModule.forFeature([AlarmDo])],
    // inject OrmAlarmRepository as AlarmRepository
    providers: [{
        provide: AlarmRepository,
        useClass: OrmAlarmRepository,
    }],
    exports: [AlarmRepository],
})
export class OrmAlarmPersistenceModule { } 