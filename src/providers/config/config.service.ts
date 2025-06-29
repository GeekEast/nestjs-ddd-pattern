import { Injectable } from '@nestjs/common';
import { ConfigMap, ConfigKey, ALL_CONFIG_KEYS } from './config.type';
import { CONFIG_REGISTRY } from './registry';

type PathsToStringProps<T> = T extends string | number | boolean | undefined
  ? never
  : {
    [K in keyof T]: K extends string
    ? T[K] extends string | number | boolean | undefined
    ? K
    : K | `${K}.${PathsToStringProps<T[K]>}`
    : never;
  }[keyof T];

type PathValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
  ? PathValue<T[K], Rest>
  : never
  : never;

type ConfigPaths = {
  [K in ConfigKey]: PathsToStringProps<ConfigMap[K]> extends never
  ? K
  : K | `${K}.${PathsToStringProps<ConfigMap[K]>}`;
}[ConfigKey];

@Injectable()
export class ConfigService {
  private configCache = new Map<string, any>();

  constructor() {
    for (const key of ALL_CONFIG_KEYS) {
      this.configCache.set(key, CONFIG_REGISTRY[key].config);
    }
  }

  get<K extends ConfigKey>(key: K): ConfigMap[K];
  get<P extends ConfigPaths>(path: P): PathValue<ConfigMap, P>;
  get<K extends ConfigKey | ConfigPaths>(keyOrPath: K): any {
    if (typeof keyOrPath === 'string' && keyOrPath.includes('.')) {
      return this.getByPath(keyOrPath as ConfigPaths);
    }

    const key = keyOrPath as ConfigKey;
    const config = this.configCache.get(key);

    if (config === undefined) {
      throw new Error(`Unknown config key: ${key}`);
    }

    return config;
  }

  private getByPath(path: ConfigPaths): any {
    const [rootKey, ...nestedPath] = path.split('.');
    const rootConfig = this.get(rootKey as ConfigKey);

    return nestedPath.reduce((current, key) => {
      return current?.[key];
    }, rootConfig);
  }
} 