import { DynamicModule, Module } from "@nestjs/common";
import { InMemoryAlarmPersistenceModule } from "./persistence/in-memory/in-memory-persistence.module";
import { OrmAlarmPersistenceModule } from "./persistence/orm/orm-alarm-persistence.module";


@Module({})
export class AlarmInfrastructureModule {
    private static readonly PERSISTENCE_MODULES = {
        'orm': OrmAlarmPersistenceModule,
        'in-memory': InMemoryAlarmPersistenceModule,
    } as const;

    static use(driver: 'orm' | 'in-memory'): DynamicModule {
        const persistenceModule = this.PERSISTENCE_MODULES[driver];

        return {
            module: AlarmInfrastructureModule,
            imports: [persistenceModule],
            exports: [persistenceModule],
        };
    }
}