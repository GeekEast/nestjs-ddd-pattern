import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlarmRepository } from "src/alarms/application/ports/alarm.repository";
import { AlarmDo } from "../dos/alarm.do";
import { Repository } from "typeorm";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmMapper } from "../mappers/alarm.mapper";


@Injectable()
export class OrmAlarmRepository implements AlarmRepository {
    constructor(@InjectRepository(AlarmDo) private readonly alarmRepository: Repository<AlarmDo>) { }

    async create(alarm: Alarm): Promise<Alarm> {
        const alarmDo = AlarmMapper.fromDomainToDO(alarm);
        const savedAlarmDo = await this.alarmRepository.save(alarmDo);
        return AlarmMapper.fromDoToDomain(savedAlarmDo);
    }


    async findAll(): Promise<Alarm[]> {
        const alarmDos = await this.alarmRepository.find();
        return alarmDos.map(alarmDo => AlarmMapper.fromDoToDomain(alarmDo));
    }

}