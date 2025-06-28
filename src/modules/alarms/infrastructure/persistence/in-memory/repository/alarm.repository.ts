import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlarmRepository } from "src/modules/alarms/application/ports/alarm.repository";
import { AlarmDo } from "../dos/alarm.do";
import { Repository } from "typeorm";
import { AlarmEntity } from "src/modules/alarms/domain/alarm.entity";
import { AlarmMapper } from "../mappers/alarm.mapper";


@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
    private readonly alarms = new Map<string, AlarmDo>();

    async create(alarm: AlarmEntity): Promise<AlarmEntity> {
        const alarmDo = AlarmMapper.fromDomainEntityToDO(alarm);
        this.alarms.set(alarmDo.id, alarmDo);

        const newAlarmDo = this.alarms.get(alarmDo.id);
        if (!newAlarmDo) {
            throw new Error("AlarmDo not found");
        }
        return AlarmMapper.fromDoToDomainEntity(newAlarmDo);
    }

    async findAll(): Promise<AlarmEntity[]> {
        return Array.from(this.alarms.values()).map(alarmDo => AlarmMapper.fromDoToDomainEntity(alarmDo));
    }

}