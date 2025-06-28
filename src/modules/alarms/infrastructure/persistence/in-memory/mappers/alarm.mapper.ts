import { AlarmEntity } from "src/modules/alarms/domain/alarm.entity";
import { AlarmDo } from "../dos/alarm.do";
import { AlarmSeverity } from "src/modules/alarms/domain/value-objects/alarm-severity";


export class AlarmMapper {
    static fromDoToDomainEntity(alarmDo: AlarmDo): AlarmEntity {
        return new AlarmEntity(alarmDo.id, alarmDo.name, AlarmSeverity.fromString(alarmDo.severity));
    }

    static fromDomainEntityToDO(alarm: AlarmEntity): AlarmDo {
        const alarmDo = new AlarmDo();
        alarmDo.id = alarm.id;
        alarmDo.name = alarm.name;
        alarmDo.severity = alarm.severity.value;
        return alarmDo;
    }
}