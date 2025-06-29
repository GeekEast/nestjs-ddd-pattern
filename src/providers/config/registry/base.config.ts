const PORT = process.env.PORT || "3000";

export const BASE_CONFIG = {
    PORT,
}

export const BASE_CONFIG_PROVIDER = 'base';
export const baseConfigProvider = {
    provide: BASE_CONFIG_PROVIDER,
    useValue: BASE_CONFIG,
}