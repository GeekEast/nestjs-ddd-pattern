import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmDo } from "./dos/alarm.do";
import { OrmAlarmRepository } from "./repository/alarm.repository";
import { AlarmRepository } from "src/alarms/application/ports/alarm.repository";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([AlarmDo])],
    providers: [{
        provide: AlarmRepository,
        useClass: OrmAlarmRepository,
    }, {
        provide: "DATA_SOURCE",
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: "postgres",   
                host: configService.get("db.host"),
                port: configService.get("db.port"),
                username: configService.get("db.username"),
                password: configService.get("db.password"),
                database: configService.get("db.database"),
            });
            return dataSource.initialize();
        },
        inject: [ConfigService],
    }],
    exports: [AlarmRepository],
})
export class OrmAlarmPersistenceModule { }