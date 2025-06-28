import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { AlarmEntity } from "../alarm.entity";
import { AlarmSeverity } from "../value-objects/alarm-severity";

@Injectable()
export class AlarmFactory {
    create(name: string, severity: string) {
        const alarmId = randomUUID();
        const alarmSeverity = new AlarmSeverity(severity as AlarmSeverity["value"]);
        return new AlarmEntity(alarmId, name, alarmSeverity);
    }
}