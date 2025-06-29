const POSTGRES_HOST = process.env.DB_HOST;
const POSTGRES_PORT = parseInt(process.env.DB_PORT || "5432", 10);
const POSTGRES_USERNAME = process.env.DB_USERNAME;
const POSTGRES_PASSWORD = process.env.DB_PASSWORD;
const POSTGRES_DATABASE = process.env.DB_NAME;

export const POSTGRES_CONFIG = {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
}

export const POSTGRES_CONFIG_PROVIDER = 'postgres';
export const postgresConfigProvider = {
    provide: POSTGRES_CONFIG_PROVIDER,
    useValue: POSTGRES_CONFIG,
}