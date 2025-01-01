import type { Config } from "drizzle-kit";

/* export default {
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config; */

import { defineConfig } from 'drizzle-kit';
import { getEnv } from './src/env.ts';

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = getEnv();

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'turso',
    dbCredentials: {
        url: TURSO_DATABASE_URL,
        authToken: TURSO_AUTH_TOKEN,
    },
})
