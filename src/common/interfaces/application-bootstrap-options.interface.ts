export enum ApplicationDriver {
    ORM = 'orm',
    IN_MEMORY = 'in-memory',
}

export interface ApplicationBootstrapOptions {
    driver: ApplicationDriver
}