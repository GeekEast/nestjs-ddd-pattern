import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ALL_CONFIG_PROVIDERS } from "./config.type";


@Global()
@Module({
    providers: [
        ...ALL_CONFIG_PROVIDERS,
        ConfigService
    ],
    exports: [ConfigService]
})
export class ConfigModule { }