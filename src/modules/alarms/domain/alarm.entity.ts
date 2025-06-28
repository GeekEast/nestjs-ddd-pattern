import { AlarmSeverity } from "./value-objects/alarm-severity";

export class AlarmEntity {
    constructor(
        public id: string,
        public name: string,
        public severity: AlarmSeverity
    ) { }
}