import { Provider } from '@nestjs/common';
import { CONFIG_REGISTRY } from './registry';

export interface ConfigRegistryEntry<T = any> {
    key: string;
    config: T;
    provider: Provider;
}

export type ConfigMap = {
    [K in keyof typeof CONFIG_REGISTRY]: (typeof CONFIG_REGISTRY)[K]['config'];
};
export type ConfigKey = keyof ConfigMap;

export const ALL_CONFIG_PROVIDERS = Object.values(CONFIG_REGISTRY).map(entry => entry.provider);
export const ALL_CONFIG_KEYS = Object.keys(CONFIG_REGISTRY) as ConfigKey[]; 