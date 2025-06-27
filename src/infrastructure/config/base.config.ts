import { registerAs } from "@nestjs/config";

export const loadBaseConfig = registerAs('base', () => ({
    port: parseInt(process.env.PORT || "3000", 10),
}))