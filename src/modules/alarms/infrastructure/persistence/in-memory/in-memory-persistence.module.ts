import { Module } from "@nestjs/common";
import { InMemoryAlarmRepository } from "./repository/alarm.repository";
import { AlarmRepository } from "src/modules/alarms/application/ports/alarm.repository";

@Module({
    // inject InMemoryAlarmRepository as AlarmRepository
    providers: [{
        provide: AlarmRepository,
        useClass: InMemoryAlarmRepository,
    }],
    exports: [AlarmRepository],
})
export class InMemoryAlarmPersistenceModule { } 