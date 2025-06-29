import { defineConfig } from "@future.ai/config";

export const BASE_CONFIG_ENTRY = defineConfig('base', () => ({
    PORT: process.env.PORT || "3000",
}));

export const POSTGRES_CONFIG_ENTRY = defineConfig('postgres', () => ({
    POSTGRES_HOST: process.env.DB_HOST,
    POSTGRES_PORT: parseInt(process.env.DB_PORT || "5432", 10),
    POSTGRES_USERNAME: process.env.DB_USERNAME,
    POSTGRES_PASSWORD: process.env.DB_PASSWORD,
    POSTGRES_DATABASE: process.env.DB_NAME,
}));

export const CONFIG_REGISTRY = {
    base: BASE_CONFIG_ENTRY,
    postgres: POSTGRES_CONFIG_ENTRY,
} as const;
