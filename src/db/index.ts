import { drizzle } from 'drizzle-orm/libsql';
import { getEnv } from '../env.ts';

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = getEnv();

export const db = drizzle({
    connection: {
        url: TURSO_DATABASE_URL!,
        authToken: TURSO_AUTH_TOKEN!
    }
});
