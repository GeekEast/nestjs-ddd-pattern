import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlarmRepository } from "src/modules/alarms/application/ports/alarm.repository";
import { AlarmDo } from "../dos/alarm.do";
import { Repository } from "typeorm";
import { AlarmEntity } from "src/modules/alarms/domain/alarm.entity";
import { AlarmMapper } from "../mappers/alarm.mapper";


@Injectable()
export class OrmAlarmRepository implements AlarmRepository {
    constructor(@InjectRepository(AlarmDo) private readonly alarmRepository: Repository<AlarmDo>) { }

    async create(alarm: AlarmEntity): Promise<AlarmEntity> {
        const alarmDo = AlarmMapper.fromDomainEntityToDO(alarm);
        const savedAlarmDo = await this.alarmRepository.save(alarmDo);
        return AlarmMapper.fromDoToDomainEntity(savedAlarmDo);
    }


    async findAll(): Promise<AlarmEntity[]> {
        const alarmDos = await this.alarmRepository.find();
        return alarmDos.map(alarmDo => AlarmMapper.fromDoToDomainEntity(alarmDo));
    }

}