import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { CONFIG_REGISTRY } from 'src/common/config';
import { ConfigModule, ConfigService } from '@future.ai/config';

@Module({})
export class CoreModule {
    private static readonly INFRASTRUCTURE_MODULES = {
        'orm': [TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<typeof CONFIG_REGISTRY>) => {
                return {
                    type: 'postgres',
                    host: configService.get("postgres.POSTGRES_HOST"),
                    port: configService.get("postgres.POSTGRES_PORT"),
                    username: configService.get("postgres.POSTGRES_USERNAME"),
                    password: configService.get("postgres.POSTGRES_PASSWORD"),
                    database: configService.get("postgres.POSTGRES_DATABASE"),
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
                ConfigModule.forRoot({ registry: CONFIG_REGISTRY }),
                ...this.INFRASTRUCTURE_MODULES[options.driver],
            ]
        }
    }
}
