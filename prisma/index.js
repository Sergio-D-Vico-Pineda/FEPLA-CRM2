import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import getEnv from '../src/env.ts';

let { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, DATABASE_URL } = getEnv();

let prisma = new PrismaClient();

try {
    const db = createClient({
        url: TURSO_DATABASE_URL,
        authToken: TURSO_AUTH_TOKEN
    })
    const adapter = new PrismaLibSQL(db);
    prisma = new PrismaClient({ adapter })
} catch (error) {
    console.log(error)
    console.error('Error al conectar con Turso, usando base de datos local:');
    prisma = new PrismaClient({
        datasources: {
            db: {
                url: DATABASE_URL
            }
        }
    });
}

export default prisma;