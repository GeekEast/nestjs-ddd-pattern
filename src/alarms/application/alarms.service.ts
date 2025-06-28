import { Injectable } from "@nestjs/common";
import { CreateAlarmCommand } from "./commands/create-alarm.command";
import { AlarmFactory } from "../domain/factories/alarm.factory";


@Injectable()
export class AlarmsService {
    constructor(private readonly alarmFactory: AlarmFactory) { }

    create(createAlarmCommand: CreateAlarmCommand) {
        return this.alarmFactory.create(createAlarmCommand.name, createAlarmCommand.severity);
    }

    findAll() {
        return [];
    }
}