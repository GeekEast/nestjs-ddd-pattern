import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { ConfigModule } from 'src/providers/config/config.module';
import { ConfigService } from 'src/providers/config/config.service';

@Module({})
export class CoreModule {
    private static readonly INFRASTRUCTURE_MODULES = {
        'orm': [TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
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
                ConfigModule,
                ...this.INFRASTRUCTURE_MODULES[options.driver],
            ]
        }
    }
}
