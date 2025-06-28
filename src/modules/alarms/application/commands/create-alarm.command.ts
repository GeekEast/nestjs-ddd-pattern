import { CreateAlarmDto } from "src/modules/alarms/presenters/http/dto/create-alarm.dto";

export class CreateAlarmCommand {
    constructor(
        public readonly name: string,
        public readonly severity: string
    ) { }

    static fromDto(dto: CreateAlarmDto): CreateAlarmCommand {
        return new CreateAlarmCommand(dto.name, dto.severity);
    }
}