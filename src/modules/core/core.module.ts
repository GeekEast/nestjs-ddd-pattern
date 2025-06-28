import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loadBaseConfig } from 'src/common/config/base.config';
import { loadDatabaseConfig } from 'src/common/config/db.config';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';

@Module({})
export class CoreModule {
    private static readonly INFRASTRUCTURE_MODULES = {
        'orm': [TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('db.host'),
                    port: configService.get('db.port'),
                    username: configService.get('db.username'),
                    password: configService.get('db.password'),
                    database: configService.get('db.database'),
                    synchronize: true,
                    autoLoadEntities: true,
                }
            },
        })],
        'in-memory': [],
    } as const;

    static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
        return {
            module: CoreModule,
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    load: [loadBaseConfig, loadDatabaseConfig],
                }),
                ...this.INFRASTRUCTURE_MODULES[options.driver],
            ]
        }
    }
}
