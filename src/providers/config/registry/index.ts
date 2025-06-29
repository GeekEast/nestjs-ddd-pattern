
import { BASE_CONFIG, BASE_CONFIG_PROVIDER, baseConfigProvider } from './base.config';
import { POSTGRES_CONFIG, POSTGRES_CONFIG_PROVIDER, postgresConfigProvider } from './postgres.config';

export const CONFIG_REGISTRY = {
    [BASE_CONFIG_PROVIDER]: {
        key: BASE_CONFIG_PROVIDER,
        config: BASE_CONFIG,
        provider: baseConfigProvider,
    },
    [POSTGRES_CONFIG_PROVIDER]: {
        key: POSTGRES_CONFIG_PROVIDER,
        config: POSTGRES_CONFIG,
        provider: postgresConfigProvider,
    },
} as const;

