import { Alarm } from "src/alarms/domain/alarm";

// reason to use abstract class:
// class could used as injected token while interface cannot.
export abstract class AlarmRepository {
    abstract create(alarm: Alarm): Promise<Alarm>;
    abstract findAll(): Promise<Alarm[]>;
}