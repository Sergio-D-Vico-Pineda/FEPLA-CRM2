import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import getEnv from '../src/env.ts';

let { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = getEnv();

const db = createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN
})

const adapter = new PrismaLibSQL(db);
const prisma = new PrismaClient({ adapter })

export { prisma };