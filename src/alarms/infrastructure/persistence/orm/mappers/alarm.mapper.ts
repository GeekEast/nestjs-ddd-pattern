import { Alarm } from "src/alarms/domain/alarm";
import { AlarmDo } from "../dos/alarm.do";
import { AlarmSeverity } from "src/alarms/domain/value-objects/alarm-severity";


export class AlarmMapper {
    static fromDoToDomain(alarmDo: AlarmDo): Alarm {
        return new Alarm(alarmDo.id, alarmDo.name, AlarmSeverity.fromString(alarmDo.severity));
    }

    static fromDomainToDO(alarm: Alarm): AlarmDo {
        const alarmDo = new AlarmDo();
        alarmDo.id = alarm.id;
        alarmDo.name = alarm.name;
        alarmDo.severity = alarm.severity.value;
        return alarmDo;
    }
}