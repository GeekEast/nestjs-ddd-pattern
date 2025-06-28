import { AlarmEntity } from "src/modules/alarms/domain/alarm.entity";

// ! reason to use abstract class:
// class could used as injected token while interface cannot.
export abstract class AlarmRepository {
    abstract create(alarm: AlarmEntity): Promise<AlarmEntity>;
    abstract findAll(): Promise<AlarmEntity[]>;
}