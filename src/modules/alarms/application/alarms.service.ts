import { Injectable } from "@nestjs/common";
import { CreateAlarmCommand } from "./commands/create-alarm.command";
import { AlarmFactory } from "../domain/factories/alarm.factory";
import { AlarmRepository } from "./ports/alarm.repository";


@Injectable()
export class AlarmsService {
    constructor(private readonly alarmFactory: AlarmFactory, private readonly alarmRepository: AlarmRepository) { }

    create(createAlarmCommand: CreateAlarmCommand) {
        const alarm = this.alarmFactory.create(createAlarmCommand.name, createAlarmCommand.severity);
        return this.alarmRepository.create(alarm);
    }

    findAll() {
        return this.alarmRepository.findAll();
    }
}