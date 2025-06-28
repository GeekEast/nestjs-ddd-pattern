import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity("alarms")
export class AlarmDo {
    @PrimaryColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    severity: string
}